from dotenv import dotenv_values
from flask import Response, request
from pymongo import MongoClient
import json
from bson import json_util

from utils.utils import success_message

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
stream_collection = db['streams']
counter_collection = db['counters']


# retrieves all streams
def get_all_streams():
    if request.method == 'GET':
        results = list(stream_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")


# retrieves one stream
def get_one_stream(streamId):
    if request.method == 'GET':
        results = list(stream_collection.find({"streamId": streamId}))
        return json.dumps(results[0], default=json_util.default)


# inserts a suspect into the blacklist database
def add_stream(post):
    if request.method == 'POST':
        new_post_object = {
            'stream_name': post['stream_name'],
            'ip': post['ip'],
            'login': post['login'],
            'pw': post['pw'],
            'location': post['location'],
            'created_at': post['created_at']
        }
        stream_collection.insert_one(new_post_object)

        message = {"msg": "Successfully added to stream_collection!"}
        return success_message(message)


# clear streams
def clear_streams():
    # reset
    stream_collection.delete_many({})
    print('cleared stream_collection')

    # reset count to 0
    sequence_value = 0
    counter_collection.find_one_and_update(
        {"_id.coll": "streams"},
        {"$set": {"seq_value": sequence_value}}
    )
    print(f'reset counter for stream_collection to {sequence_value}')
