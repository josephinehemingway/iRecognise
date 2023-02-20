import React from "react";
import "./Cards.css";
// @ts-ignore
import VideoThumbnail from 'react-video-thumbnail';

type Props = {
    url: string;
    cameraName: string;
    locationName: string;
    onClick?: React.MouseEventHandler;
};

const LivestreamCard: React.FC<Props> = ({
    url,
    locationName,
    cameraName,
    onClick,
}) => {
    return (
        <div className="stream-card-wrapper" onClick={onClick}>
            <div className="stream-img">
                {/*<img src={url} width="100%" alt="" />*/}
                <VideoThumbnail
                    videoUrl={url}
                    thumbnailHandler={(thumbnail: any) => console.log(thumbnail)}
                    width={339}
                    height={210}
                />
            </div>
            <h2 className="stream-name"> {cameraName} </h2>
            <h2 className="stream-location"> {locationName} </h2>
        </div>
    );
};

export default LivestreamCard;
