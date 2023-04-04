import React from 'react';
import {UploadsApi} from "../../utils/interfaces";
import {StyledLabel, StyledMediumTitle} from "../reusable/styledText";

type Props = {
    video: UploadsApi ;
}

const VideoPlayer: React.FC<Props> = ({ video }) => {
    return (
        <>
            <div className={'video-input'} style={{height: '522px'}}>
                <StyledMediumTitle fontsize={'20px'}>Raw Video</StyledMediumTitle>
                <StyledLabel marginbottom={'1rem'} >Original Video Upload</StyledLabel>

                <video width='100%' height={'100%'} controls autoPlay src={video.url_path} />
            </div>
            <div className={'video-input'} style={{height: '522px'}}>
                <StyledMediumTitle fontsize={'20px'}>Processed Video</StyledMediumTitle>
                <StyledLabel marginbottom={'1rem'} >Processed video may be subject to lag during processing.</StyledLabel>
                <video width='100%' height={'100%'} controls autoPlay src={video.processed_path} />
                {/*<img alt='live'*/}
                {/*     id="main"*/}
                {/*     width="100%"*/}
                {/*     src={`http://localhost:5000/video_feed?stream=${video.url_path}&save=False`}/>*/}
            </div>
        </>
    );
};

export default VideoPlayer;