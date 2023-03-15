import React, {useState} from "react";
import "./Cards.css";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import nullVideo from "../../../assets/Images/nullvideo.png";

type Props = {
    streamId: number;
    url: string;
    cameraName: string;
    locationName: string;
    active: boolean;
    onClick?: React.MouseEventHandler;
};

const LiveCard: React.FC<Props> = ({   streamId,
                                       url,
                                       locationName,
                                       cameraName,
                                       onClick,
                                       active
                                      }) => {

    const [deviceActive, setDeviceActive] = useState<boolean>(active)

    const handleEditStreamStatus = () => {
        setDeviceActive(!deviceActive)

        fetch(`/stream?id=${streamId}&active=${!deviceActive}`, {
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


    return (
        <div className="stream-card-wrapper" >
            <div className="live-img" onClick={onClick}>
                <img
                    alt={'live'}
                    src={deviceActive ? url : nullVideo}
                    width={'100%'}
                    height={350}
                />
            </div>
            <h2 className="stream-name">
                {cameraName}
                {deviceActive ?
                    <CheckCircleOutlined style={{color: "#a0e77f", marginLeft: '0.5rem', fontSize: '18px'}} onClick={handleEditStreamStatus} /> :
                    <CloseCircleOutlined style={{color: "#c74668", marginLeft: '0.5rem', fontSize: '18px'}} onClick={handleEditStreamStatus}/>
                }
            </h2>
            <h2 className="stream-location"> {locationName} </h2>

        </div>
    );
};

export default LiveCard;
