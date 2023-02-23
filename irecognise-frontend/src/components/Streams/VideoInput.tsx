import React from 'react';

const VideoInput = () => {
    return (
        <div className={'video-input'}>
            {/*<img alt='live' id="main" width="640" height="480" src="http://192.168.0.153:8080/video"/>*/}
            <img alt='live' id="main" width="100%" src="http://localhost:5000/video_feed?stream=trimmed_test.mp4"/>
        </div>
    );
};

export default VideoInput;