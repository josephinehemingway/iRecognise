import React, {useEffect, useState} from 'react';
import {UploadsApi} from "../../utils/interfaces";

type Props = {
    video: UploadsApi ;
}

const VideoPlayer: React.FC<Props> = ({ video }) => {
    const [videoUrl, setVideoUrl] = useState<string>('')

    useEffect(() => {
        if (video.videoId) {
            setVideoUrl(`https://irecognise.s3-ap-southeast-1.amazonaws.com/uploads/${video.videoId.toString()}/${video.video_name}.mp4`)
        }

    }, [video.videoId]);

    return (
        <div className={'video-input'}>
            <video width='100%' height={'100%'} controls autoPlay src={videoUrl} />
        </div>
    );
};

export default VideoPlayer;