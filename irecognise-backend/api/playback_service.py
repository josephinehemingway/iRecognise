from dotenv import dotenv_values
from flask import Response, request
from pymongo import MongoClient
import json
from bson import ObjectId

from api.blacklist_service import update_suspect_last_seen

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
        'video_url': s3_video_url,
        'face_url': s3_face_url
    }
    history_collection.insert_one(new_post_object)
    message = {"msg": "Successfully added to history!"}
    print(message)


def update_last_detected(suspectId, timestamp, similarity, camera='', location='', s3_video_url='', s3_face_url=''):
    add_history(suspectId, timestamp, camera, location, similarity, s3_video_url, s3_face_url)
    update_suspect_last_seen(suspectId, timestamp, location)


# retrieves all history logs in blacklist
def get_history_logs():
    if request.method == 'GET':
        results = list(history_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")


def get_history_by_suspect(suspectId):
    if request.method == 'GET':
        results = list(history_collection.find({
            'suspectId': suspectId,
            'camera': {'$ne': 'None'},
            'location': {'$ne': 'None'}
        }))
        return Response(json.dumps(results, default=str), mimetype="application/json")


def get_history_record(objectId):
    if request.method == 'GET':
        results = list(history_collection.find({'_id': ObjectId(objectId)}))
        return Response(json.dumps(results[0], default=str), mimetype="application/json")


def clear_history():
    # reset
    history_collection.delete_many({})
    print('cleared history_collection')
