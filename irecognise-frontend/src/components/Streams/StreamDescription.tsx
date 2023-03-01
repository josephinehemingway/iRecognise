import React, {useEffect, useState} from 'react';
import './styles.css'
import {StyledMediumTitle, StyledLabel, StyledText} from "../reusable/styledText";
import {VIDEO_TYPE} from "../../utils/constants";

type Props = {
    streamType: string;
    locationName: string | undefined;
    source?: string | undefined;
    date?: string;
    model?: string;
    ip?: string | undefined;
    description?: string | undefined;
    createdAt?: string | undefined;
}

const StreamDescription: React.FC<Props> = ({streamType,
                                                locationName,
                                                ip,
                                                date,
                                                model,
                                                description,
                                                createdAt,
                                                source
                                            }) => {
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 300);
    }, []);

    return (
        <div className={'upload-description'}>
            <StyledMediumTitle marginbottom={'1rem'} fontsize={'20px'}>Stream Description</StyledMediumTitle>

            {streamType === VIDEO_TYPE.UPLOAD &&
                <div className={'desc-item'}>
                    <StyledLabel>Description</StyledLabel>
                    <StyledText>{description ? description : 'None'}</StyledText>
                </div>
            }

            <div className={'desc-item'}>
                <StyledLabel>Location</StyledLabel>
                <StyledText>{locationName}</StyledText>
            </div>

            {streamType === VIDEO_TYPE.LIVE &&
                <div className={'desc-item'}>
                    <StyledLabel>Source / IP Address</StyledLabel>
                    <StyledText align={'start'}>{ip ? ip : 'None'}</StyledText>
                </div>
            }

            {streamType === VIDEO_TYPE.UPLOAD &&
                <div className={'desc-item'}>
                    <StyledLabel>Source</StyledLabel>
                    <StyledText>{source ? source + '.mp4' : 'None'}</StyledText>
                </div>
            }

            <div className={'desc-item'}>
                <StyledLabel>Date</StyledLabel>
                <StyledText>{date ? date : dateState.toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                    })}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel>Model</StyledLabel>
                <StyledText>{model ? model : 'VGG-Face'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel>Created At</StyledLabel>
                <StyledText>{createdAt ? createdAt : 'None'}</StyledText>
            </div>
        </div>
    );
};

export default StreamDescription;