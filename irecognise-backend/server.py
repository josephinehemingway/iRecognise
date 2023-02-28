from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util, ObjectId
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt

from api.playback_service import *
from api.user_account_service import *
from api.blacklist_service import *
from api.streams_service import *
from api.uploads_service import *
from face_recognition.camera import gen
import cv2

'''
THURSDAY 23 FEB
'''
# DONE: send logging to frontend for display
# DONE: retrieve video from s3 for processing - use url pass into videocapture?
# DONE: clean up front end and linking during stream creation - videostream path/date/source/model for streams


'''
WEEKEND 26 FEB
'''
# DONE: set logging intervals so not spamming
# DONE: results displaying
# DONE: whenever a new image is uploaded to s3, to create embedding and input into mongodb
# DONE: display profile pictures

'''
RECESS WEEK
'''
### NEXT STEPS
# DONE: video playback page
# DONE: when person detected for 5 seconds consecutively, upload last seen to mongodb and history section,
# DONE: save snippets of webcam
# TODO: upload snippet to s3 for viewing
# TODO: upload face

# DONE: playback player
# DONE: playback page filter by timestamp
# DONE: link history

# TODO: integrate multiple ip camera streams
# TODO: notification via email or telegram


# TODO: upload floor plan
# TODO: draw out floorplan path taken between time period/detected time period
# TODO: recent activity section

'''
TODO: START WRITING REPORT
'''


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


@app.route('/representation', methods=["POST"])
def upload_representation():
    return upload_embedding(request)


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


@app.route('/history', methods=["GET"])
def get_history():
    return get_history_logs()


@app.route('/suspecthistory', methods=["GET"])
def get_suspect_history():
    suspectId = int(request.args.get('id'))
    return get_history_by_suspect(suspectId)


@app.route('/historyrecord', methods=["GET"])
def get_history_instance():
    objectId = request.args.get('id')
    return get_history_record(objectId)


@app.route('/video_feed')
def video_feed():
    # get video path from url query
    stream = request.args.get('stream')
    location = request.args.get('location')  # camera location
    source = request.args.get('source')  # camera name

    print(stream)

    is_stream = False

    if stream == 'webcam' or stream == '0':
        print('webcam on')
        stream = 0
        is_stream = True

    # check if stream is ip camera, then set is stream = true

    video = cv2.VideoCapture(stream)

    return Response(gen(video, is_stream, location, source),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


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
    # To reset, uncomment the following lines and manually delete from s3
    # clear_blacklist()
    # clear_streams()
    # clear_uploads()
    # clear_users()
    # clear_deepface()
    # clear_history()

    app.run(debug=True, threaded=True)
