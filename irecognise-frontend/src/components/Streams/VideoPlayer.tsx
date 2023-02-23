import React, {useEffect, useState} from 'react';
import {UploadsApi} from "../../utils/interfaces";
import {UPLOAD_S3_PREFIX} from "../../utils/constants";
import {StyledLabel, StyledMediumTitle} from "../reusable/styledText";

type Props = {
    video: UploadsApi ;
}

const VideoPlayer: React.FC<Props> = ({ video }) => {
    const [videoUrl, setVideoUrl] = useState<string>('')

    useEffect(() => {
        if (video.videoId) {
            setVideoUrl(`${UPLOAD_S3_PREFIX}${video.videoId.toString()}/${video.video_name}.mp4`)
        }

    }, [video.videoId, video.video_name]);

    return (
        <>
            <div className={'video-input'}>
                <StyledMediumTitle fontsize={'20px'}>Raw Video</StyledMediumTitle>
                <StyledLabel marginbottom={'1rem'} >Original Video Upload</StyledLabel>

                <video width='100%' height={'100%'} controls autoPlay src={videoUrl} />
            </div>
            <div className={'video-input'}>
                <StyledMediumTitle fontsize={'20px'}>Processed Video</StyledMediumTitle>
                <StyledLabel marginbottom={'1rem'} >Processed video may be subject to lag during processing.</StyledLabel>
                <img alt='live'
                     id="main"
                     width="100%"
                     src={`http://localhost:5000/video_feed?stream=${videoUrl}`}/>
            </div>
        </>
    );
};

export default VideoPlayer;