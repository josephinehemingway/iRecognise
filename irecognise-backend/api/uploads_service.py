from dotenv import dotenv_values
from flask import Response, request
from pymongo import MongoClient
import json
from bson import json_util

from utils.utils import success_message

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
upload_collection = db['uploads']
counter_collection = db['counters']


# retrieves all uploads
def get_all_uploads():
    if request.method == 'GET':
        results = list(upload_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")


# retrieves one video
def get_one_video(videoId):
    if request.method == 'GET':
        results = list(upload_collection.find({"videoId": videoId}))
        return json.dumps(results[0], default=json_util.default)


# inserts a suspect into the blacklist database
def add_video(post):
    if request.method == 'POST':
        new_post_object = {
            'video_name': post['video_name'],
            'description': post['description'],
            'location': post['location'],
            'created_at': post['created_at']
        }
        upload_collection.insert_one(new_post_object)

        message = {"msg": "Successfully added to upload_collection!"}
        return success_message(message)


# clear uploads
def clear_uploads():
    # reset
    upload_collection.delete_many({})
    print('cleared upload_collection')

    # reset count to 0
    sequence_value = 0
    counter_collection.find_one_and_update(
        {"_id.coll": "uploads"},
        {"$set": {"seq_value": sequence_value}}
    )
    print(f'reset counter for upload_collection to {sequence_value}')
