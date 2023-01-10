import React from 'react';
import {BlacklistApi} from "../../utils/interfaces";
import './styles.css'
import {StyledLabel, StyledText} from "../reusable/styledText";
import {capitalise} from "../../utils/helperfunctions";
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../reusable/button";

type Props = {
    suspect: BlacklistApi | undefined;
    handleEdit: () => void;
}

const PersonalDetails: React.FC<Props> = ({suspect, handleEdit}) => {

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
                    <StyledText marginbottom={'0.5rem'}> #{suspect.suspectId} </StyledText>

                    <StyledLabel> Name </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.name} </StyledText>

                    <StyledLabel> Gender </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {capitalise(suspect.gender)} </StyledText>

                    <StyledLabel> Status </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {capitalise(suspect.status)} </StyledText>

                    <StyledLabel> Age Range </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.age} </StyledText>

                    <StyledLabel> Description </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.description} </StyledText>

                    <StyledLabel> Last Seen </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.last_seen_location}, {suspect.last_seen_timestamp} </StyledText>

                    <StyledLabel> Last Modified </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.last_modified} </StyledText>

                    <StyledLabel> Created At </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.created_at} </StyledText>
                </div>
            }
            <StyledButton onClick={handleEdit}>
                <EditOutlined/>
                Edit Profile
            </StyledButton>
        </div>
    );
};

export default PersonalDetails;