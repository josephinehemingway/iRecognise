from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util, ObjectId

app = Flask(__name__)
client = MongoClient('mongodb+srv://josephinehemingway:Ntu2022@fypcluster.7xfymcs.mongodb.net/?retryWrites=true&w=majority')

db = client.iRecognise
blacklist_collection = db['blacklist']
counter_collection = db['counters']
stream_collection = db['streams']

@app.route('/blacklist', methods=["GET"])
def get_blacklist():
    results = list(blacklist_collection.find())
    return Response(json.dumps(results,default=str),mimetype="application/json")

@app.route('/suspect', methods=["GET"])
def get_suspect():
	suspectId = int(request.args.get('id'))
	results = list(blacklist_collection.find({"suspectId": suspectId}))

	return json.dumps(results[0], default=json_util.default)

@app.route('/nextcount', methods=["GET"])
def get_next_count():
    results = list(counter_collection.find())
    latest_count = results[0]['seq_value']
    next_count = latest_count + 1
    return Response(json.dumps(next_count,default=str),mimetype="application/json")

@app.route('/suspect', methods=["POST"])
def add_to_blacklist():
	post = request.json

	new_post_object = {}
	new_post_object['name'] = post['name']
	new_post_object['age'] = post['age']
	new_post_object['gender'] = post['gender']
	new_post_object['status'] = post['status']
	new_post_object['description'] = post['description']
	new_post_object['last_seen_location'] =  post['last_seen_location']
	new_post_object['last_seen_timestamp'] =  post['last_seen_timestamp']
	new_post_object['last_modified'] =  post['last_modified']
	new_post_object['created_at'] =  post['created_at']

	new_post_result = blacklist_collection.insert_one(new_post_object)
# 	mongo_id = new_post_result.inserted_id
# 	print(mongo_id)
#
# 	new_object = list(blacklist_collection.find({"_id": mongo_id}))
# 	print(new_object[0])
# 	print(new_object[0]['suspect_id'])

	message = {"msg": "Successfully added to blacklist!"}
	resp = jsonify(message)
	resp.status_code = 200

	return resp

@app.route('/suspect', methods=["PUT"])
def update_profile():
	suspect_id = int(request.args.get('id'))
	results = list(blacklist_collection.find({"suspectId": suspect_id}))
	results_id = results[0]['_id']

	post = request.json

	updated_name = post['name']
	updated_age = post['age']
	updated_gender = post['gender']
	updated_status= post['status']
	updated_description = post['description']
	updated_last_modified = post['last_modified']
# 	updated_last_seen_location = post['description']
# 	updated_last_seen_timestamp = post['description']

	blacklist_collection.find_one_and_update(
		{"_id": ObjectId(results_id)},
		{"$set": {
			"name": updated_name,
			"age": updated_age,
			"gender": updated_gender,
			"status": updated_status,
			"description": updated_description,
# 			"last_seen_location": updated_last_seen_location,
# 			"last_seen_timestamp": updated_last_seen_timestamp,
			"last_modified": updated_last_modified
		}})

	message = {"msg": "Successfully updated blacklist!"}
	resp = jsonify(message)
	resp.status_code = 200

	return resp

@app.route('/streams', methods=["GET"])
def get_streams_list():
    results = list(stream_collection.find())
    return Response(json.dumps(results,default=str),mimetype="application/json")

@app.route('/stream', methods=["GET"])
def get_stream():
	streamId = int(request.args.get('id'))
	results = list(stream_collection.find({"_id": streamId}))

	return json.dumps(results[0], default=json_util.default)

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

stream = {
	"_id": 4,
	"stream_name": "CCTV 4",
	"location": "NTU Arc",
	"created_at": "22/12/2022 11:23:45"
}

if __name__ == '__main__':
# 	stream_collection.insert_one(stream)
	## To reset database, uncomment the following lines
# 	blacklist_collection.delete_many({})
# 	print('deleted')
# 	sequence_value = 0
# 	counter_collection.find_one_and_update({"_id.coll": "blacklist"}, {"$set": {"seq_value": sequence_value}})
# 	print(f'updated sequence value to {sequence_value}')

	app.run(debug=True, threaded=True)