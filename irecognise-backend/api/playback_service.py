from dotenv import dotenv_values
from flask import Response, request
from pymongo import MongoClient
import json
from bson import json_util, ObjectId

from api.blacklist_service import update_suspect_last_seen
from face_recognition.inference import create_embedding

from utils.utils import success_message

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
blacklist_collection = db['blacklist']
history_collection = db['history']


# inserts a suspect into the history database
def add_history(suspectId, timestamp, camera, location, similarity, s3_video_url, s3_face_url):
    new_post_object = {
        'suspectId': int(suspectId),
        'timestamp': timestamp,
        'similarity': similarity,
        'camera': camera,
        'location': location,
        'videoUrl': s3_video_url,
        'faceUrl': s3_face_url
    }
    history_collection.insert_one(new_post_object)
    message = {"msg": "Successfully added to history!"}
    print(message)


def update_last_detected(suspectId, timestamp, similarity, camera='', location='', s3_video_url='', s3_face_url=''):
    add_history(suspectId, timestamp, camera, location, similarity, s3_video_url, s3_face_url)
    update_suspect_last_seen(suspectId, timestamp, location)


def clear_history():
    # reset
    history_collection.delete_many({})
    print('cleared history_collection')
