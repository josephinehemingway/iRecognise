from flask import Flask, request
from pymongo import MongoClient
from datetime import datetime
import json
import jsonpickle
from bson import json_util

app = Flask(__name__)
client = MongoClient('mongodb+srv://josephinehemingway:Ntu2022@fypcluster.7xfymcs.mongodb.net/?retryWrites=true&w=majority')

db = client.iRecognise
blacklist_collection = db['blacklist']

# datetime object containing current date and time
now = datetime.now()
# dd/mm/YY H:M:S
dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

post = {
	"_id": 1,
	"name": "John Smith",
	"dob": '12/1/1990',
	"status": 'wanted',
	"description": "Wanted for stealing a wallet",
	"last_seen_location": None,
	"last_seen_timestamp": None,
	"last_modified": dt_string,
	"created_at": dt_string,
}

def add_to_blacklist(post):
	blacklist_collection.insert_one(post)

# API routes
@app.route('/blacklist', methods=["GET"])
def get_blacklist():
    results = list(blacklist_collection.find())
    return json.dumps(results)

@app.route('/suspect', methods=["GET"])
def get_suspect():
	_id = int(request.args.get('id'))
	results = list(blacklist_collection.find({"_id": _id}))

	return json.dumps(results[0], default=json_util.default)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)