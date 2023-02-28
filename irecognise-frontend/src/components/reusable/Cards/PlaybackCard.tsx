import React, {useEffect, useState} from "react";
import "./Cards.css";
import { StyledLabel, StyledText } from "../styledText";
import {BlacklistApi} from "../../../utils/interfaces";
import {Spin} from "antd";

type Props = {
    url: string;
    id: number;
    similarity: string;
    cameraName: string;
    locationName: string;
    timestamp: string;
    onClick?: React.MouseEventHandler;
};

const PlaybackCard: React.FC<Props> = ({
    url,
    id,
    similarity,
    timestamp,
    locationName,
    cameraName,
    onClick
}) => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [suspect, setSuspect] = useState<BlacklistApi>()

    useEffect(() => {
        setLoading(true);
        fetch(`/suspect?id=${id}`).then((res) =>
            res.json().then((data) => {
                setSuspect(data);
            })
        );
        setLoading(false);
    }, [id]);


    return (
        <div className={"playback-card"} onClick={onClick}>
            <img
                alt={'identity'}
                src={url}
                height="100%"
                width="100%"
                className="person-img-card"
            />
            <div className={"playback-details"} >
                <StyledLabel fontsize={"14px"} align={'start'}> {timestamp} </StyledLabel>
                <StyledLabel fontsize={"12px"} align={'start'}> {cameraName} </StyledLabel>
                <StyledLabel fontsize={"12px"} align={'start'} marginbottom={'1rem'}> {locationName} </StyledLabel>

                {loading ?
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Spin tip="Loading..."/>
                    </div> :
                    <StyledText fontsize={"14px"} align={'start'} style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                        #{id} / {suspect?.name}
                    </StyledText>
                }

                <StyledText fontsize={"14px"} align={'start'} style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                    {similarity}% match
                </StyledText>

            </div>
        </div>
    );
};

export default PlaybackCard;
