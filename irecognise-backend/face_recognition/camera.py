import cv2
from face_recognition.inference import *


def get_frame(video, db_embeddings, selected_metric='cosine', selected_model='VGG-Face'):
    ret, frame = video.read()

    frame, identity, similarity = process_frame(
        frame,
        db_embeddings,
        color=(255,0,0),
        metric=selected_metric,
        model=selected_model
    )

    ret, jpeg = cv2.imencode('.jpg', frame)
    return jpeg.tobytes(), identity, similarity
