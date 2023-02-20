import os
from flask import Flask, request, render_template, url_for
from utils.utils import error_response, success_response, success_message
from flask_bcrypt import Bcrypt
from datetime import datetime
from dotenv import dotenv_values
from pymongo import MongoClient

# TODO: register function, register api, abstract out methods, remove print statements
# TODO: send verification email etc

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
                return error_response('User already exists')

            response = users_collection.insert_one({
                'username': data['username'],
                'email': data['email'],
                'firstname': data['firstname'],
                'lastname': data['lastname'],
                'password': hashed_pw,
            })

            return success_message("Account successfully created!")

        except Exception as e:
            return error_response(e)
        
    else:
        return error_response("Invalid method[GET/POST]")


def login():
    if request.method == 'POST':
        data = request.json
        hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        print(data)
        # Get json data from POST request
        response = list(users_collection.find({'username': data['username']}))
        print(response)

        try:
            item = response[0]
            print(item)

            if bcrypt.check_password_hash(item['password'], data['password']):
                response_object = {
                    'username': item['username']
                }
                return success_response(response_object,
                                        "User successfully logged in")
            else:
                return error_response("Your username or password is incorrect.")
        except:
            # if item does not exist, a different data object would be returned that does not have the field "Item"
            # it would have the field "ResponseMetaData" instead
            return error_response("User does not exist")
    else:
        return error_response("Invalid method[GET/POST]")
