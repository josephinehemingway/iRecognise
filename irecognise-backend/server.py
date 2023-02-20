from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util, ObjectId
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
from api.user_account_service import *
from api.blacklist_service import *
from api.streams_service import *
from api.uploads_service import *


# retrieve dotenv config
config = dotenv_values(".env")

# initialise Flask app
app = Flask(__name__)
bcrypt = Bcrypt(app)

# MONGODB
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
counter_collection = db['counters']


@app.route('/nextcount', methods=["GET"])
def get_next_count():
    collection = request.args.get('coll')
    results = list(counter_collection.find({"_id.coll": collection}))
    latest_count = results[0]['seq_value']
    next_count = latest_count + 1
    return Response(json.dumps(next_count, default=str), mimetype="application/json")


@app.route('/blacklist', methods=["GET"])
def get_blacklist():
    return get_all_suspects()


@app.route('/suspect', methods=["GET"])
def get_suspect():
    suspectId = int(request.args.get('id'))
    return get_one_suspect(suspectId)


@app.route('/suspect', methods=["POST"])
def add_to_blacklist():
    post = request.json
    return add_suspect(post)


@app.route('/suspect', methods=["PUT"])
def update_profile():
    suspectId = int(request.args.get('id'))
    return update_suspect_details(suspectId)


@app.route('/streams', methods=["GET"])
def get_streams_list():
    return get_all_streams()


@app.route('/stream', methods=["GET"])
def get_stream():
    streamId = int(request.args.get('id'))
    return get_one_stream(streamId)


@app.route('/stream', methods=["POST"])
def add_new_stream():
    post = request.json
    return add_stream(post)


@app.route('/uploads', methods=["GET"])
def get_uploads_list():
    return get_all_uploads()


@app.route('/video', methods=["GET"])
def get_video():
    videoId = int(request.args.get('id'))
    return get_one_video(videoId)


@app.route('/video', methods=["POST"])
def upload_video():
    post = request.json
    return add_video(post)


@app.route('/login', methods=["POST"])
def loginUser():
    print('logging in')
    return login()


@app.route('/register', methods=["POST"])
def registerUser():
    print('registering user')
    return register()


@app.route('/users', methods=["GET"])
def get_users():
    return get_all_users()


@app.errorhandler(404)
def page_not_found(e):
    """Send message to the user with notFound 404 status."""
    # Message to the user
    message = {
        "err":
            {
                "msg": "This route is currently not supported. Please refer API documentation."
            }
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp


if __name__ == '__main__':
    # To reset, uncomment the following lines
    # clear_blacklist()
    # clear_streams()
    # clear_uploads()
    # clear_users()
    app.run(debug=True, threaded=True)
