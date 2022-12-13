import React from 'react';
import {BlacklistApi} from "../../utils/interfaces";
import './styles.css'
import {StyledLabel, StyledText} from "../reusable/styledText";
import {capitalise} from "../../utils/helperfunctions";

type Props = {
    suspect: BlacklistApi | undefined
}

const PersonalDetails: React.FC<Props> = ({suspect}) => {
    return (
        <div className={'details-card'}>
            <img
                className={'person-img'}
                alt={'Suspect'}
                height={'220px'}
                width={'15%'}
                src={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'} />
            { suspect &&
                <div className={'details-text'}>
                    <StyledLabel> ID </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> #{suspect._id} </StyledText>

                    <StyledLabel> Name </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.name} </StyledText>

                    <StyledLabel> Status </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {capitalise(suspect.status)} </StyledText>
                </div>
            }
        </div>
    );
};

export default PersonalDetails;