# iRecognise
A Final Year Project by Josephine Hemingway in NTU SCSE 2022-2023.

iRecognise is an all-in-one surveillance web application that leverages deep facial recognition technology to detect and recognise registered blacklisted personnel in real time live streams. It also allows users to upload pre-recorded videos for facial recognition analysis, and enroll blacklisted individuals into the application database along with their facial images. Once a suspect is detected, alerts will be sent out to users on Telegram via a Telegram Bot. 

Tech stack used:
- React TypeScript frontend
- Python Flask backend
- MongoDB 
- Amazon S3 to store multimedia data
- Telegram Bot API

Facial Recognition:
- Deepface


## Commands

### `npm i`

-   Run this before starting to install all dependencies for frontend after pulling from git

### `pip install -r requirements.txt`

-   Run this before starting to install all dependencies for backend after pulling from git

### `npm run start-flask-api`

-   Run this to activate virtual environment for backend.\
    Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm start`

-   to start the application in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
