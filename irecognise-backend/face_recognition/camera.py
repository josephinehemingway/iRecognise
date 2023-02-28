import cv2

from api.playback_service import update_last_detected
from face_recognition.inference import *
from pymongo import MongoClient
from dotenv import dotenv_values
import os
import traceback
from datetime import datetime

# retrieve dotenv config
config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]

deepface_collection = db['deepface']
blacklist_collection = db['blacklist']

models = [
    "VGG-Face",
    "Facenet",
    "Facenet512",
    "OpenFace",
    "DeepFace",
    "DeepID",
    "ArcFace",
    "Dlib",
    "SFace",
]

metrics = ["cosine", "euclidean", "euclidean_l2"]
idx_metric = 0
idx_model = 0


set_fps = 5  # fps for video snippet
fps_frames = 5 * 5  # no of frame needed for 5sec video snippet
temp_dir = '/Users/josephinehemingway/Desktop/NTU/Y4S1/FYP/iRecognition/irecognise-backend/temp'
output_dir = '/Users/josephinehemingway/Desktop/NTU/Y4S1/FYP/iRecognition/irecognise-backend/output'


def get_frame(video, count, db_embeddings, selected_metric='cosine',
              selected_model='VGG-Face', stream=False,
              source=None, location=None):
    ret, frame = video.read()

    if ret:
        if stream:
            count += 30  # i.e. at 30 fps, this advances one second
            video.set(cv2.CAP_PROP_POS_FRAMES, count)

        frame, identity, similarity = process_frame(
            frame,
            db_embeddings,
            color=(255, 0, 0),
            metric=selected_metric,
            model=selected_model
        )

        # start saving if someone in db is detected
        if identity is not None:
            if stream:  # if is ip camera or webcam
                # save first frame (when temp dir is empty)
                num_frames = len(os.listdir(temp_dir))

                if num_frames == 0:
                    os.chdir(output_dir)
                    timestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

                    print('saving to log file')
                    with open('detection.txt', 'w') as f:
                        f.write(f'{timestamp},{identity},{str(similarity)}')

                    os.chdir(temp_dir)
                    print(f'saving first frame {num_frames} at {timestamp}\n')
                    cv2.imwrite(str(num_frames) + '.png', frame)

        num_frames = len(os.listdir(temp_dir))

        # only save snippets for streams
        # when temp dir is not empty and number of frames < total frames needed for the video
        if fps_frames > num_frames > 0 and stream:
            os.chdir(temp_dir)
            num_frames = len(os.listdir(temp_dir))
            cur_frame = num_frames
            print('current frame', cur_frame)
            cv2.imwrite(str(num_frames) + '.png', frame)
            print('saving frame ', num_frames)

            num_frames = len(os.listdir(temp_dir))
            after_frame = num_frames
            print('after frame', after_frame)

            if after_frame == cur_frame:
                print('num frames is not incrementing!!')
                # delete all frames in temp dir
                print('\ndeleting frames')
                for f in os.listdir(temp_dir):
                    os.remove(os.path.join(temp_dir, f))

            if num_frames == fps_frames:
                print('###################\nrecorded 5 second snippet done\n\n')
                img_array = []

                size = (1280, 720)

                # saving images into sequence and writing into video
                for i in range(1, num_frames):
                    file = f'{temp_dir}/{i}.png'
                    img = cv2.imread(file)
                    img_array.append(img)

                # saving video into output dir
                video_name = f'{output_dir}/video.mp4'

                out = cv2.VideoWriter(video_name, cv2.VideoWriter_fourcc(*'mp4v'), set_fps, size)
                for i in range(len(img_array)):
                    out.write(img_array[i])
                out.release()

                print('\n\n ----- Saved Video ----- \n\n')

                # upload video to s3 here

                ''' upload details to mongodb here '''
                os.chdir(output_dir)
                with open('detection.txt') as f:
                    lines = f.readlines()

                detection_details = lines[0].split(',')
                d_timestamp = detection_details[0]
                d_identity = detection_details[1]
                d_similarity = detection_details[2]

                print('location: ', location)
                print('location: ', source)

                update_last_detected(d_identity, d_timestamp, d_similarity, location=location, camera=source)

                # delete all frames in temp dir
                print('\ndeleting frames')
                for f in os.listdir(temp_dir):
                    os.remove(os.path.join(temp_dir, f))

        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes(), identity, similarity

    else:
        # if not stream:
        #     video.set(cv2.CAP_PROP_POS_FRAMES, 0)  # replay video
        video.release()


def get_frame_without_identity(video, selected_metric='cosine', selected_model='VGG-Face'):
    ret, frame = video.read()

    frame = process_frame_without_identity(
        frame,
        color=(255, 0, 0),
        metric=selected_metric,
        model=selected_model
    )

    ret, jpeg = cv2.imencode('.jpg', frame)
    return jpeg.tobytes()


def gen(camera, stream=False, location=None, source=None):
    # get embeddings from mongodb
    embeddings = []
    count = 0
    documents = deepface_collection.find()

    if documents:
        for d in documents:
            d_embedding = [d['img_path'], d['embedding']]
            embeddings.append(d_embedding)

    # delete all frames in temp dir
    print(f'deleting {len(os.listdir(temp_dir))} frames')
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))

    while camera.isOpened():
        try:
            if len(embeddings) != 0:
                frame, identity, similarity = get_frame(camera,
                                                        count,
                                                        embeddings,
                                                        selected_metric=metrics[idx_metric],
                                                        selected_model=models[idx_model],
                                                        stream=stream,
                                                        source=source,
                                                        location=location)

                fps = camera.get(cv2.CAP_PROP_FPS)  # 30fps

                print('detected id: ', identity, ', with similarity: ', similarity, '\n')

                name = ''
                if identity is not None:
                    name = list(blacklist_collection.find({'suspectId': int(identity)}))[0]['name']

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n'
                                                                     b'Content-Type: text/plain\r\n' +
                       str(identity).encode('utf-8') + b'\r\n' +
                       str(similarity).encode('utf-8') + b'\r\n' +
                       str(name).encode('utf-8') + b'\r\n')
            else:
                print('no embeddings found')

                frame = get_frame_without_identity(camera)

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

        except Exception as e:
            #     print('video ended')
            print(e)
            traceback.print_exc()
            continue
