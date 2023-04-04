from dotenv import dotenv_values
from flask import request, Response
from flask_bcrypt import Bcrypt
import json
from pymongo import MongoClient
from utils.utils import error_response, success_response, success_message

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
users_collection = db['users']
bcrypt = Bcrypt()


def register():
    if request.method == 'POST':
        data = request.json
        hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        try:
            response = list(users_collection.find({'username': data['username']}))

            if response != []:
                return error_response('Username is already in use')

            response = list(users_collection.find({'email': data['email']}))

            if response != []:
                return error_response('Email is already in use')

            if len(data['password']) < 6:
                return error_response('Password must have 6 or more characters or digits.')

            if "@" not in data['email']:
                return error_response('Please enter a valid email')

            users_collection.insert_one({
                'username': data['username'],
                'email': data['email'],
                'firstname': data['firstname'],
                'lastname': data['lastname'],
                'password': hashed_pw,
                'telegramID': data['telegramID'],
                'created_at': data['created_at']
            })
            return success_message("Account successfully created!")

        except Exception as e:
            return error_response(e)

    else:
        return error_response("Invalid method[GET/POST]")


def login():
    if request.method == 'POST':
        data = request.json

        # Get json data from POST request
        response = list(users_collection.find({'username': data['username']}))

        try:
            item = response[0]

            if bcrypt.check_password_hash(item['password'], data['password']):
                response_object = {
                    'username': item['username'],
                    'firstname': item['firstname'],
                    'lastname': item['lastname'],
                    'email': item['email'],
                    'telegramID': item['telegramID']
                }
                return success_response(response_object, "User successfully logged in")
            else:
                return error_response("Your username or password is incorrect.")
        except:
            # if item does not exist, a different data object would be returned that does not have the field "Item"
            # it would have the field "ResponseMetaData" instead
            return error_response("User does not exist")
    else:
        return error_response("Invalid method[GET/POST]")


# retrieve all users
def get_all_users():
    if request.method == 'GET':
        results = list(users_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")


# clear uploads
def clear_users():
    # reset
    users_collection.delete_many({})
    print('cleared users_collection')

