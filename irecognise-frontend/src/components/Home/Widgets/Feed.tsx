import React, {useState} from "react";
import "../styles.css";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import nullVideo from "../../../assets/Images/nullvideo.png";
import {Tooltip} from "antd";
import {StreamsApi} from "../../../utils/interfaces";
import {useNavigate} from "react-router-dom";
import {capitalise, checkVideoPath} from "../../../utils/helperfunctions";

type Props = {
    stream: StreamsApi;
};

const Feed: React.FC<Props> = ({ stream}) => {
    const [deviceActive, setDeviceActive] = useState<boolean>(stream.active)

    const handleEditStreamStatus = () => {
        setDeviceActive(!deviceActive)

        fetch(`/stream?id=${stream.streamId}&active=${!deviceActive}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
            })
        })

    }

    let navigate = useNavigate()
    const handleClick = () => {
        navigate(`/streams/${stream.streamId}`)
    }

    const url = `http://localhost:5000/video_feed?stream=${checkVideoPath(stream.ip, stream.login, stream.pw)}&location=${stream.location}&source=${stream.stream_name}&save=True`

    return (
        <div className="feed-card" >
            <div className="feed-img" onClick={handleClick}>
                <img
                    alt={'live'}
                    src={deviceActive ? url : nullVideo}
                    width={'100%'}
                    height={'100%'}
                />
            </div>
            <h2 className="stream-name">
                {stream.stream_name}

                {deviceActive ?
                    <Tooltip placement="right" title={'Click to deactivate stream'}>
                        <CheckCircleOutlined style={{color: "#a0e77f", marginLeft: '0.5rem', fontSize: '18px'}} onClick={handleEditStreamStatus} />
                    </Tooltip>:
                    <Tooltip placement="right" title={'Click to activate stream'}>
                        <CloseCircleOutlined style={{color: "#c74668", marginLeft: '0.5rem', fontSize: '18px'}} onClick={handleEditStreamStatus}/>
                    </Tooltip>
                }
            </h2>
            <h2 className="stream-location"> {capitalise(stream.location)} </h2>
        </div>
    );
};

export default Feed;
