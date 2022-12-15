from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
from datetime import datetime
import json
from bson import json_util

app = Flask(__name__)
client = MongoClient('mongodb+srv://josephinehemingway:Ntu2022@fypcluster.7xfymcs.mongodb.net/?retryWrites=true&w=majority')

db = client.iRecognise
blacklist_collection = db['blacklist']

# datetime object containing current date and time
now = datetime.now()
# dd/mm/YY H:M:S
dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
#
# post = {
# 	"name": "Christian Hemingway",
# 	"dob": '28/3/2000',
# 	"status": 'wanted',
# 	"gender": 'male',
# 	"description": "Wanted for gaming too much",
# 	"last_seen_location": None,
# 	"last_seen_timestamp": None,
# 	"last_modified": dt_string,
# 	"created_at": dt_string,
# }

@app.route('/blacklist', methods=["GET"])
def get_blacklist():
    results = list(blacklist_collection.find())
    return Response(json.dumps(results,default=str),mimetype="application/json")

@app.route('/suspect', methods=["GET"])
def get_suspect():
	suspectId = int(request.args.get('id'))
	results = list(blacklist_collection.find({"suspectId": suspectId}))

	return json.dumps(results[0], default=json_util.default)

@app.route('/suspect', methods=["POST"])
def add_to_blacklist():
	post = request.json

	new_post_object = {}
	new_post_object['name'] = post['name']
	new_post_object['age'] = post['age']
	new_post_object['gender'] = post['gender']
	new_post_object['status'] = post['status']
	new_post_object['description'] = post['description']
	new_post_object['last_seen_location'] = None
	new_post_object['last_seen_timestamp'] = None
	new_post_object['last_modified'] = dt_string
	new_post_object['created_at'] = dt_string

	new_post_result = blacklist_collection.insert_one(new_post_object)

	message = {"msg": "Successfully added to blacklist!"}
	resp = jsonify(message)
	resp.status_code = 200

	return resp

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
# 	blacklist_collection.delete_many({})
# 	print('deleted')
	app.run(debug=True, threaded=True)