from dotenv import dotenv_values
from flask import Response, request
from pymongo import MongoClient
import json
from bson import json_util, ObjectId
from face_recognition.inference import create_embedding

from utils.utils import success_message

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
blacklist_collection = db['blacklist']
counter_collection = db['counters']
deepface_collection = db['deepface']


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
                "last_modified": post['last_modified']
            }})

        message = {"msg": "Successfully updated suspect!"}

        return success_message(message)


def update_suspect_last_seen(suspectId, timestamp, location):
    blacklist_collection.find_one_and_update(
        {"suspectId": int(suspectId)},
        {"$set": {
            "last_seen_location": location,
            "last_seen_timestamp": timestamp,
        }})

    message = {"msg": "Successfully updated suspect last seen!"}
    print(message)


def upload_embedding(post):
    img_path = post.form['image_path']
    representation = create_embedding(img_path)
    deepface_collection.insert_one({"img_path": img_path, "embedding": representation})

    message = {"msg": f"Successfully uploaded embedding for {img_path}"}
    return success_message(message)


def get_suspect_name(suspectId):
    results = list(blacklist_collection.find({"suspectId": suspectId}))
    return json.dumps(results[0]['name'], default=json_util.default)


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


# clear embeddings on mongodb - should be cleared when clearing blacklist
def clear_deepface():
    # reset
    deepface_collection.delete_many({})
    print('cleared deepface_collection')
