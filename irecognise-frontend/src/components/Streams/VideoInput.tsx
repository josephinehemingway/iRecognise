import React from 'react';
import {StyledLabel} from "../reusable/styledText";

type Props = {
    videoPath: string | undefined; // can be 0 for webcam, video path on local, ip address
    source: string | undefined;
    location: string | undefined;
}

const VideoInput: React.FC<Props> = ({videoPath, location, source}) => {

    return (
            <div className={'video-input'}>
                { videoPath &&
                    <img alt='live'
                         id="main"
                         width="100%"
                         src={`http://localhost:5000/video_feed?stream=${videoPath}&location=${location}&source=${source}`}/>
                }
                <StyledLabel marginbottom={'1rem'} margintop={'1rem'}>Stream may be subject to lag due to processing.</StyledLabel>

                {/*<img alt='live' id="main" width="640" height="480" src="http://192.168.0.153:8080/video"/>*/}
            </div>
    );
};

export default VideoInput;