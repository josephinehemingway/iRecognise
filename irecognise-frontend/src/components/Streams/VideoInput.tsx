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

    const videoConstraints = {
        width: 1100,
        height: 690,
        facingMode: "user"
    }

    return (
        <div className={'video-input'}>
            <img alt='live' id="main" width="640" height="480" src="http://192.168.0.153:8080/video"/>
            {
                webcamActive &&
                <Webcam
                    audio={false}
                    ref={webcam}
                    mirrored
                    videoConstraints={videoConstraints}
                />
            }
            { webcamActive ?
                <button onClick={stopWebcam}>Stop Video</button> :
                <button onClick={startWebcam}>Start Video</button>
            }
        </div>
    );
};

export default VideoInput;