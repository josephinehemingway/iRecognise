import cv2
from deepface import DeepFace
from deepface.commons import functions, distance as dst
import time
import pandas as pd


def find(img_path,  # frame
         representations,
         model_name="VGG-Face",
         distance_metric="cosine",
         enforce_detection=True,
         detector_backend="opencv",
         align=True,
         normalization="base",
         silent=False, ):
    tic = time.time()

    target_size = functions.find_target_size(model_name=model_name)

    # if not silent:
    #     print("There are ", len(representations), " representations found in mongodb.")

    # now, we got representations for facial database
    df = pd.DataFrame(representations, columns=["identity", "embedding"])

    # img path might have more than once face
    target_objs = functions.extract_faces(
        img=img_path,
        target_size=target_size,
        detector_backend=detector_backend,
        grayscale=False,
        enforce_detection=enforce_detection,
        align=align,
    )

    resp_obj = []

    for target_img, target_region, _ in target_objs:
        target_embedding_obj = DeepFace.represent(
            img_path=target_img,
            model_name=model_name,
            enforce_detection=enforce_detection,
            detector_backend="skip",
            align=align,
            normalization=normalization,
        )

        target_representation = target_embedding_obj[0]["embedding"]

        result_df = df.copy()  # df will be filtered in each img
        result_df["source_x"] = target_region["x"]
        result_df["source_y"] = target_region["y"]
        result_df["source_w"] = target_region["w"]
        result_df["source_h"] = target_region["h"]

        distances = []
        for index, instance in df.iterrows():
            source_representation = instance["embedding"]

            if distance_metric == "cosine":
                distance = dst.findCosineDistance(source_representation, target_representation)
            elif distance_metric == "euclidean":
                distance = dst.findEuclideanDistance(source_representation, target_representation)
            elif distance_metric == "euclidean_l2":
                distance = dst.findEuclideanDistance(
                    dst.l2_normalize(source_representation),
                    dst.l2_normalize(target_representation),
                )
            else:
                raise ValueError(f"invalid distance metric passes - {distance_metric}")

            distances.append(distance)

            # ---------------------------

        result_df[f"{model_name}_{distance_metric}"] = distances

        threshold = dst.findThreshold(model_name, distance_metric)
        result_df = result_df.drop(columns=["embedding"])
        result_df = result_df[result_df[f"{model_name}_{distance_metric}"] <= threshold]
        result_df = result_df.sort_values(
            by=[f"{model_name}_{distance_metric}"], ascending=True
        ).reset_index(drop=True)

        resp_obj.append(result_df)

    # -----------------------------------

    toc = time.time()

    if not silent:
        print("find function lasts ", toc - tic, " seconds")

    return resp_obj


def process_frame(frame, db_embeddings, color=(0, 0, 255), metric='cosine', model='VGG-Face'):
    # detect faces
    try:
        faces = DeepFace.extract_faces(frame, enforce_detection=True)
        print(len(faces), ' faces detected!')

        # if faces are detected
        if len(faces) > 0:
            for face in faces:
                facial_area = face['facial_area']

                # get bb coordinates
                xmin = facial_area['x']
                xmax = facial_area['x'] + facial_area['w']
                ymin = facial_area['y']
                ymax = facial_area['y'] + facial_area['h']

                # draw bounding boxes for each detected face
                cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), color, 2)

                # recognise identity from db representations
                output = find(face['face'],
                              representations=db_embeddings,
                              detector_backend='skip',
                              enforce_detection=False,
                              distance_metric=metric,
                              model_name=model
                              )

                if len(output) > 0:
                    identity_arr = output[0]['identity']

                    if len(identity_arr) > 0:
                        top_match = identity_arr[0].split('/')[-2]
                        similarity = round((1 - output[0][f'{model}_{metric}'][0]) * 100, 2)

                        # display
                        cv2.putText(frame, top_match, (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
                        cv2.putText(frame, str(similarity), (xmin, ymin - 25), cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)

                        return frame, top_match, similarity

    except Exception as e:
        print(e)
        print('no faces detected')
        return frame, None, None
