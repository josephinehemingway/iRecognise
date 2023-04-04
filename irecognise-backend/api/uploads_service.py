import os

import cv2
from dotenv import dotenv_values
from flask import Response, request
from pymongo import MongoClient
import json
from bson import json_util
import boto3

from face_recognition.camera import process_uploaded_video
from utils.utils import success_message

# retrieve dotenv config
config = dotenv_values(".env")

# S3
s3_prefix = 'https://irecognise.s3.ap-southeast-1.amazonaws.com/'
bucket_name = config['AWS_BUCKET_NAME']
s3 = boto3.client(
    "s3",
    aws_access_key_id=config['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=config['AWS_SECRET_ACCESS_KEY']
)


config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
upload_collection = db['uploads']
counter_collection = db['counters']

upload_temp_dir = '/Users/josephinehemingway/Desktop/NTU/Y4S1/FYP/iRecognition/irecognise-backend/upload_temp'
upload_output_dir = '/Users/josephinehemingway/Desktop/NTU/Y4S1/FYP/iRecognition/irecognise-backend/upload_output'
main_dir = '/Users/josephinehemingway/Desktop/NTU/Y4S1/FYP/iRecognition/irecognise-backend'

# retrieves all uploads
def get_all_uploads():
    if request.method == 'GET':
        results = list(upload_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")


# retrieves one video
def get_one_video(videoId):
    if request.method == 'GET':
        results = list(upload_collection.find({"videoId": videoId}))
        return json.dumps(results[0], default=json_util.default)


# inserts a suspect into the blacklist database
def add_video(post):
    if request.method == 'POST':
        new_post_object = {
            'video_name': post['video_name'],
            'description': post['description'],
            'location': post['location'],
            'date': post['date'],
            'url_path': post['url_path'],
            'processed_path': post['processed_path'],
            'created_at': post['created_at']
        }
        upload_collection.insert_one(new_post_object)

        message = {"msg": "Successfully added to upload_collection!"}
        return success_message(message)

def process_video(post):
    video_path = post.form['video_path']
    video = cv2.VideoCapture(video_path)

    # TODO: process video using deepface frame by frame
    process_uploaded_video(video)

    # # TODO: frontend get processed video from s3


    message = {"msg": f"Successfully uploaded processed video for {video_path}"}
    return success_message(message)


def save_video(post):
    video_path = post.form['video_path']
    video = cv2.VideoCapture(video_path)
    source = video_path.split('/')[-2] + '/' + video_path.split('/')[-1]

    img_array = []
    # fps = 30
    fps = video.get(cv2.CAP_PROP_FPS)

    print('fps', fps)

    # stitch back frames together
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    size = (width, height)

    for i in range(1, len(os.listdir(upload_temp_dir))):
        file = f'{upload_temp_dir}/{i}.png'
        img = cv2.imread(file)
        img_array.append(img)

    # saving video into output dir
    video_name = f'{upload_output_dir}/processed_video.mp4'
    print(f'writing video to {video_name}')

    out = cv2.VideoWriter(video_name, cv2.VideoWriter_fourcc(*"avc1"), fps, size)
    for i in range(len(img_array)):
        out.write(img_array[i])
    out.release()

    print('saved!')

    # TODO: upload video to s3
    video_key = f'processed/{source}'
    with open(video_name, 'rb') as f:
        s3.upload_fileobj(f, bucket_name, video_key,
                          ExtraArgs={
                              'ACL': 'public-read',
                              'ContentType': 'video/mp4',
                              'ContentDisposition': 'inline'
                          }
                          )

    print('uploaded processed video to s3')

    message = {"msg": f"Successfully saved processed video for {video_path}"}
    return success_message(message)


# clear uploads
def clear_uploads():
    # reset
    upload_collection.delete_many({})
    print('cleared upload_collection')

    # reset count to 0
    sequence_value = 0
    counter_collection.find_one_and_update(
        {"_id.coll": "uploads"},
        {"$set": {"seq_value": sequence_value}}
    )
    print(f'reset counter for upload_collection to {sequence_value}')
