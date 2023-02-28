import React, {useEffect, useState} from 'react';
import {BlacklistApi} from "../../utils/interfaces";
import './styles.css'
import {StyledLabel, StyledText} from "../reusable/styledText";
import {capitalise} from "../../utils/helperfunctions";
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../reusable/button";
import blankProfile from "../../assets/Images/blank-profile.png";
import {s3Config} from "../../services/s3Config";
import {S3_PREFIX} from "../../utils/constants";
import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
})

const s3 = new AWS.S3();

type Props = {
    suspect: BlacklistApi | undefined;
    handleEdit: () => void;
    id: string;
}

const PersonalDetails: React.FC<Props> = ({suspect, handleEdit, id}) => {

    const [profileImgUrl, setProfileImgUrl] = useState<string>('')

    useEffect(() => {
        s3.listObjects({ Bucket: s3Config.bucketName, Prefix: `images/suspects/${id}` }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data.Contents);

                if (data.Contents && data.Contents.length > 0 ) {
                    const profilePicture = data.Contents[0].Key!

                    setProfileImgUrl(S3_PREFIX + profilePicture)
                }
            }
        });
    },[])

    return (
        <div className={'details-card'}>
            <img
                className={'person-img'}
                height={'220px'}
                width={'150px'}
                alt={'Suspect'}
                src={profileImgUrl ? profileImgUrl : blankProfile} />
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