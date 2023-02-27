import React from "react";
import "./Cards.css";
import { StyledLabel, StyledText } from "../styledText";

type Props = {
    url: string;
    id: number;
    identity: string;
    cameraName: string;
    locationName: string;
    timestamp: string;
    onClick?: React.MouseEventHandler;
};

const PlaybackCard: React.FC<Props> = ({
    url,
    id,
    identity,
    timestamp,
    locationName,
    cameraName,
    onClick
}) => {
    return (
        <div className={"playback-card"} onClick={onClick}>
            <img
                alt={identity}
                src={url}
                height="100%"
                width="100%"
                className="person-img-card"
            />
            <div className={"playback-details"} >
                <StyledLabel fontsize={"14px"} align={'start'}> {timestamp} </StyledLabel>
                <StyledText fontsize={"14px"} align={'start'} style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                   #{id} / {identity}
                </StyledText>
                <StyledLabel fontsize={"12px"} align={'start'}> {locationName} / {cameraName} </StyledLabel>
            </div>
        </div>
    );
};

export default PlaybackCard;
