import cv2
from face_recognition.inference import *
from pymongo import MongoClient
from dotenv import dotenv_values
import traceback

# retrieve dotenv config
config = dotenv_values(".env")

# MONGODB
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


def get_frame(video, count, db_embeddings, selected_metric='cosine', selected_model='VGG-Face'):
    ret, frame = video.read()

    if ret:
        # cv2.imwrite('frame{:d}.jpg'.format(count), frame)
        count += 30  # i.e. at 30 fps, this advances one second
        video.set(cv2.CAP_PROP_POS_FRAMES, count)

        frame, identity, similarity = process_frame(
            frame,
            db_embeddings,
            color=(255,0,0),
            metric=selected_metric,
            model=selected_model
        )

        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes(), identity, similarity

    else:
        # video.set(cv2.CAP_PROP_POS_FRAMES, 0)  # replay video
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


def gen(camera):
    # get embeddings from mongodb
    embeddings = []
    count = 0
    documents = deepface_collection.find()

    if documents:
        for d in documents:
            d_embedding = [d['img_path'], d['embedding']]
            embeddings.append(d_embedding)

    while camera.isOpened():
        try:
            if len(embeddings) != 0:
                print('works')
                frame, identity, similarity = get_frame(camera,
                                                        count,
                                                        embeddings,
                                                        selected_metric=metrics[idx_metric],
                                                        selected_model=models[idx_model])

                fps = camera.get(cv2.CAP_PROP_FPS)  # 30fps

                print('detected: ', identity, ' with similarity: ', similarity)

                name = ''
                if identity is not None:
                    name = list(blacklist_collection.find({'suspectId': int(identity)}))[0]['name']

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n'
                       b'Content-Type: text/plain\r\n' + str(identity).encode('utf-8') + b'\r\n' +
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
        #     traceback.print_exc()
            continue
