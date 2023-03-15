import React from "react";
import "./Cards.css";

type Props = {
    url: string;
    cameraName: string;
    locationName: string;
    onClick?: React.MouseEventHandler;
};

const LiveCard: React.FC<Props> = ({
                                          url,
                                          locationName,
                                          cameraName,
                                          onClick,
                                      }) => {
    return (
        <div className="stream-card-wrapper" onClick={onClick}>
            <div className="live-img">
                <img
                    alt={'live'}
                    src={url}
                    width={525}
                    height={350}
                />
            </div>
            <h2 className="stream-name"> {cameraName} </h2>
            <h2 className="stream-location"> {locationName} </h2>
        </div>
    );
};

export default LiveCard;
