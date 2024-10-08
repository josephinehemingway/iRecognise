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

const UploadsCard: React.FC<Props> = ({
    url,
    locationName,
    cameraName,
    onClick,
}) => {
    return (
        <div className="stream-card-wrapper" onClick={onClick}>
            <div className="stream-img">
                <VideoThumbnail
                    videoUrl={url}
                    width={339}
                    height={210}
                />
            </div>
            <h2 className="stream-name"> {cameraName} </h2>
            <h2 className="stream-location"> {locationName} </h2>
        </div>
    );
};

export default UploadsCard;
