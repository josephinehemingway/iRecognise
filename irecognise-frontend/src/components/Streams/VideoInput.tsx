import React, {useRef, useState} from 'react';
import Webcam from "react-webcam";

const VideoInput = () => {
    const [webcamActive, setWebcamActive] = useState<boolean>(false)
    const webcam = useRef<Webcam>(null);

    const startWebcam = () => {
        setWebcamActive(true)
    }

    const stopWebcam = () => {
        setWebcamActive(false)
        // @ts-ignore
        let stream = webcam.current.stream;
        // @ts-ignore
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setWebcamActive(false);
    }

    return (
        <div className={'video-input'}>
            {
                webcamActive && <Webcam audio={false} ref={webcam} mirrored/>
            }
            { webcamActive ?
                <button onClick={stopWebcam}>Stop Video</button> :
                <button onClick={startWebcam}>Start Video</button>
            }
        </div>
    );
};

export default VideoInput;