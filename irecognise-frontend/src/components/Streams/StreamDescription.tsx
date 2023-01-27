import React from 'react';
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

const StreamDescription: React.FC<Props> = ({streamType, locationName, ip, date, model, description, createdAt}) => {
    return (
        <div className={'video-description'}>
            <StyledMediumTitle marginbottom={'0.5rem'} fontsize={'20px'}>Stream Description</StyledMediumTitle>

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

            <div className={'desc-item'}>
                <StyledLabel>Source IP Address</StyledLabel>
                <StyledText>{ip ? ip : 'None'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel>Date</StyledLabel>
                <StyledText>{date ? date : 'None'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel>Model</StyledLabel>
                <StyledText>{model ? model : 'None'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel>Created At</StyledLabel>
                <StyledText>{createdAt ? createdAt : 'None'}</StyledText>
            </div>
        </div>
    );
};

export default StreamDescription;