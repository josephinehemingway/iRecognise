import React from 'react';
import './Cards.css';
import { StyledText, StyledLabel, StyledLink } from '../styledText';

type Props = {
    id: number;
    name: string;
    status: string;
    imgUrl: string;
}

const PersonCard: React.FC<Props> = ({id, name, status, imgUrl}) => {
    return (
        <div className={'person-card'}>
            <img alt={name} src={imgUrl} height='100%' width= '30%' className='person-img'/>
            <div className={'person-details'}>
                <StyledLabel fontsize={'12px'}> ID </StyledLabel>
                <StyledText fontsize={'14px'} marginbottom={'0.25rem'}> #{id} </StyledText>

                <StyledLabel fontsize={'12px'}> Name </StyledLabel>
                <StyledText fontsize={'14px'} marginbottom={'0.25rem'}> {name} </StyledText>

                <StyledLabel fontsize={'12px'}> Status </StyledLabel>
                <StyledText fontsize={'14px'} marginbottom={'0.25rem'}> {status} </StyledText>

                <StyledLink href={`/blacklist/${id}`} fontsize={'12.5px'}> View Details </StyledLink>
            </div>
        </div>
    );
};

export default PersonCard;