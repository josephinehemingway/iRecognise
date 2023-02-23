import React from 'react';

type Props = {
    videoPath: string | undefined; // can be 0 for webcam, video path on local, ip address
}

const VideoInput: React.FC<Props> = ({videoPath}) => {
    return (
            <div className={'video-input'}>
                { videoPath &&
                    <img alt='live'
                         id="main"
                         width="100%"
                         src={`http://localhost:5000/video_feed?stream=${videoPath}`}/>
                }
                {/*<img alt='live' id="main" width="640" height="480" src="http://192.168.0.153:8080/video"/>*/}
            </div>
    );
};

export default VideoInput;