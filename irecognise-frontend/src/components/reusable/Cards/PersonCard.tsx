import React from 'react';
import './Cards.css';
import { StyledText, StyledLabel, StyledLink } from '../styledText';

type Props = {
    id: string;
    name: string;
    status: string;
    imgUrl: string;
}

const PersonCard: React.FC<Props> = ({id, name, status, imgUrl}) => {
    return (
        <div className={'person-card'}>
            <img alt={name} src={imgUrl} height='100%' width= '30%' className='person-img'/>
            <div className={'person-details'}>
                <StyledLabel> ID </StyledLabel>
                <StyledText> {id} </StyledText>

                <StyledLabel> Name </StyledLabel>
                <StyledText> {name} </StyledText>

                <StyledLabel> Status </StyledLabel>
                <StyledText> {status} </StyledText>

                <StyledLink fontsize={'12.5px'}> View Details </StyledLink>
            </div>
        </div>
    );
};

export default PersonCard;