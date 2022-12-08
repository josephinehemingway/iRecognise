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
                <StyledLabel fontsize={'14px'}>Location</StyledLabel>
                <StyledText fontsize={'16px'}>{locationName}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel fontsize={'14px'}>Source</StyledLabel>
                <StyledText fontsize={'16px'}>{source ? source : 'None'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel fontsize={'14px'}>Date</StyledLabel>
                <StyledText fontsize={'16px'}>{date ? date : 'None'}</StyledText>
            </div>

            <div className={'desc-item'}>
                <StyledLabel fontsize={'14px'}>Model</StyledLabel>
                <StyledText fontsize={'16px'}>{model ? model : 'None'}</StyledText>
            </div>
        </div>
    );
};

export default StreamDescription;