import React from 'react';
import {StyledLabel} from "../reusable/styledText";
import {checkVideoPath} from "../../utils/helperfunctions";

type Props = {
    videoPath: string | undefined; // can be 0 for webcam, video path on local, ip address
    source: string | undefined;
    location: string | undefined;
    login: string | undefined;
    pw: string | undefined;
}

const VideoInput: React.FC<Props> = ({videoPath, location, source, login, pw}) => {
    return (
            <div className={'video-input'}>
                <StyledLabel marginbottom={'1rem'} margintop={'1rem'}>Stream may be subject to lag due to processing.</StyledLabel>
                { videoPath &&
                    <img alt='live'
                         id="main"
                         width="100%"
                         src={`http://localhost:5000/video_feed?stream=${checkVideoPath(videoPath, login, pw)}&location=${location}&source=${source}&save=True`}/>
                }
            </div>
    );
};

export default VideoInput;