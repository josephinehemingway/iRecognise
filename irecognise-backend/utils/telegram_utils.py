import telegram
import requests
from dotenv import dotenv_values

config = dotenv_values(".env")
token = config['TELEGRAM_BOT_API_TOKEN']
chat_id = config['TELEGRAM_DEFAULT_CHAT_ID']


def send_telegram_alerts(message, img_url, video_url):
    apiURL = f'https://api.telegram.org/bot{token}'

    try:
        sendPhotoApi = f'{apiURL}/sendPhoto'
        sendVideoApi = f'{apiURL}/sendVideo'

        vidPayload = {
            'chat_id': chat_id,
            'video': video_url,
        }
        requests.post(sendVideoApi, json=vidPayload)

        print('sent video')

        imgPayload = {
            'chat_id': chat_id,
            'photo': img_url,
            'caption': message,
        }
        requests.post(sendPhotoApi, json=imgPayload)

        print('sent photo with caption')

        # url = f'https://api.telegram.org/bot{token}/sendMediaGroup'
        # payload = {
        #     'chat_id': chat_id,
        #     'media': [
        #         {
        #             "type": "photo",
        #             "media": img_url,
        #             "caption": 'hello'
        #         },
        #         {
        #             "type": "video",
        #             "media": vid_url,
        #         }
        #     ],
        # }
        # requests.post(url, json=payload)
    except Exception as e:
        print(e)
