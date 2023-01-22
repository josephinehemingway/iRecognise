import React, {useEffect, useState} from 'react';
import {listFilesS3} from "../../services/UploadFileS3";

type Props = {
    id: number | undefined;
}

const VideoPlayer: React.FC<Props> = ({ id }) => {
    const [videoUrl, setVideoUrl] = useState<string>('')

    useEffect(() => {
        if (id) {
            listFilesS3(`uploads/${id.toString()}`).then((res) =>
                {
                    console.log(res[0].publicUrl)
                    setVideoUrl(res[0].publicUrl);
                    console.log(res)
                }
            );
        }

        // const params = {
        //     Bucket: S3_BUCKET,
        //     Key: `uploads/${id}/Video 1.mp4`,
        //     Expires: URL_EXPIRATION_TIME
        // }
        // const preSignUrl = s3.getSignedUrl("getObject", params);
        //
        // console.log(preSignUrl);
        // setVideoUrl(preSignUrl);

    }, [id]);

    return (
        <div className={'video-input'}>
            <video width='100%' height={'100%'} controls autoPlay src={videoUrl} />
        </div>
    );
};

export default VideoPlayer;