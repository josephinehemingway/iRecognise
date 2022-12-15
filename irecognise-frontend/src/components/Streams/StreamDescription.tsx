import React from 'react';
import './styles.css'
import {StyledMediumTitle, StyledLabel, StyledText} from "../reusable/styledText";

type Props = {
    locationName: string;
    source?: string;
    date?: string;
    model?: string;
}

const StreamDescription: React.FC<Props> = ({locationName, source, date, model}) => {
    return (
        <div className={'video-description'}>
            <StyledMediumTitle marginbottom={'0.5rem'} fontsize={'20px'}>Stream Description</StyledMediumTitle>

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