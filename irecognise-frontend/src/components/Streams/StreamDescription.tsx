import React from 'react';
import './styles.css'
import {StyledMediumTitle, StyledLabel, StyledText} from "../reusable/styledText";
import {VIDEO_TYPE} from "../../utils/constants";

type Props = {
    streamType: string;
    locationName: string | undefined;
    source?: string;
    date?: string;
    model?: string;
    description?: string;
}

const StreamDescription: React.FC<Props> = ({streamType, locationName, source, date, model, description}) => {
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
                <StyledLabel>Source</StyledLabel>
                <StyledText>{source ? source : 'None'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel>Date</StyledLabel>
                <StyledText>{date ? date : 'None'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel>Model</StyledLabel>
                <StyledText>{model ? model : 'None'}</StyledText>
            </div>

        </div>
    );
};

export default StreamDescription;