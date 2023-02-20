from dotenv import dotenv_values
from flask import Response, request
from pymongo import MongoClient
import json
from bson import json_util, ObjectId

from utils.utils import success_message

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
blacklist_collection = db['blacklist']
counter_collection = db['counters']


# retrieves all suspects in blacklist
def get_all_suspects():
    if request.method == 'GET':
        results = list(blacklist_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")


# retrieves one suspect by id
def get_one_suspect(suspectId):
    if request.method == 'GET':
        results = list(blacklist_collection.find({"suspectId": suspectId}))
        return json.dumps(results[0], default=json_util.default)


# inserts a suspect into the blacklist database
def add_suspect(post):
    if request.method == 'POST':
        new_post_object = {
            'name': post['name'],
            'age': post['age'],
            'gender': post['gender'],
            'status': post['status'],
            'description': post['description'],
            'last_seen_location': post['last_seen_location'],
            'last_seen_timestamp': post['last_seen_timestamp'],
            'last_modified': post['last_modified'],
            'created_at': post['created_at']
        }
        blacklist_collection.insert_one(new_post_object)
        message = {"msg": "Successfully added to blacklist!"}

        return success_message(message)


# update suspect details
def update_suspect_details(suspectId):
    if request.method == 'PUT':
        results = list(blacklist_collection.find({"suspectId": suspectId}))
        results_id = results[0]['_id']
        post = request.json

        blacklist_collection.find_one_and_update(
            {"_id": ObjectId(results_id)},
            {"$set": {
                "name": post['name'],
                "age": post['age'],
                "gender": post['gender'],
                "status": post['status'],
                "description": post['description'],
                # 			"last_seen_location": updated_last_seen_location,
                # 			"last_seen_timestamp": updated_last_seen_timestamp,
                "last_modified": post['last_modified']
            }})

        message = {"msg": "Successfully updated suspect!"}

        return success_message(message)


# clear blacklist
def clear_blacklist():
    # reset
    blacklist_collection.delete_many({})
    print('cleared blacklist_collection')

    # reset count to 0
    sequence_value = 0
    counter_collection.find_one_and_update(
        {"_id.coll": "blacklist"},
        {"$set": {"seq_value": sequence_value}}
    )
    print(f'reset counter for blacklist_collection to {sequence_value}')
