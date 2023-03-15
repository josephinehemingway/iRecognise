import React from 'react';
import {StyledLabel} from "../reusable/styledText";

type Props = {
    videoPath: string | undefined; // can be 0 for webcam, video path on local, ip address
    source: string | undefined;
    location: string | undefined;
    login: string | undefined;
    pw: string | undefined;
}

const VideoInput: React.FC<Props> = ({videoPath, location, source, login, pw}) => {

    const checkVideoPath = (path: string, login: string | undefined, pw: string | undefined) => {
        if (path === 'webcam' || path === 'Webcam' || path === '0') {
            // for webcam stream
            return path
        }
        else if (path.includes(':')) {
            // this is an ip address
            if (login === undefined || pw === undefined || login === '' || pw === '') {
                return `https://${videoPath}/video`
            } else {
                // with login and pw
                return `https://${login}:${pw}@${videoPath}/video`
            }
        }
    }

    return (
            <div className={'video-input'}>
                { videoPath &&
                    <img alt='live'
                         id="main"
                         width="100%"
                         src={`http://localhost:5000/video_feed?stream=${checkVideoPath(videoPath, login, pw)}&location=${location}&source=${source}&save=True`}/>
                }
                <StyledLabel marginbottom={'1rem'} margintop={'1rem'}>Stream may be subject to lag due to processing.</StyledLabel>
            </div>
    );
};

export default VideoInput;