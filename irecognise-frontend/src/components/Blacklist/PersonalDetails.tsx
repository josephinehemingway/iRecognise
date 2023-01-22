import React, {useEffect, useState} from 'react';
import {BlacklistApi} from "../../utils/interfaces";
import './styles.css'
import {StyledLabel, StyledText} from "../reusable/styledText";
import {capitalise} from "../../utils/helperfunctions";
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../reusable/button";
import {listFilesS3} from "../../services/UploadFileS3";
import blankProfile from "../../assets/Images/blank-profile.png";

type Props = {
    suspect: BlacklistApi | undefined;
    handleEdit: () => void;
}

const PersonalDetails: React.FC<Props> = ({suspect, handleEdit}) => {

    const [profileImgUrl, setProfileImgUrl] = useState<string>('')

    useEffect(() => {
        if (suspect) {
            listFilesS3(`images/suspects/${suspect.suspectId!.toString()}`).then((res) =>
                {
                    if (res.length > 0) {
                        setProfileImgUrl(res[0].publicUrl);
                        console.log(res)
                    }
                }
            );
        }
    }, [suspect]);

    return (
        <div className={'details-card'}>
            <img
                className={'person-img'}
                height={'220px'}
                width={'150px'}
                alt={'Suspect'}
                src={profileImgUrl === '' ? blankProfile : profileImgUrl} />
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