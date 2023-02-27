import React, {useEffect, useState} from 'react';
import {BlacklistApi} from "../../utils/interfaces";
import './styles.css'
import {StyledLabel, StyledText} from "../reusable/styledText";
import {capitalise} from "../../utils/helperfunctions";
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../reusable/button";
import blankProfile from "../../assets/Images/blank-profile.png";
import {IMAGES_S3_PREFIX} from "../../utils/constants";

type Props = {
    suspect: BlacklistApi | undefined;
    handleEdit: () => void;
}

const PersonalDetails: React.FC<Props> = ({suspect, handleEdit}) => {

    const [profileImgUrl, setProfileImgUrl] = useState<string>('')

    useEffect(() => {
        if (suspect) {
            const url = `${IMAGES_S3_PREFIX}${suspect.suspectId!.toString()}/0`
            const jpeg = `${url}.jpeg`
            const png = `${url}.png`
            const jpg = `${url}.jpg`
            const JPG = `${url}.JPG`

            const resp = fetch(jpeg, { method: 'HEAD' });
            resp.then(r => {
                console.log(r.headers.get('content-type'))
                if (r.status === 200) {
                    setProfileImgUrl(jpeg)
                }
                else {
                    const resp = fetch(png, { method: 'HEAD' });
                    resp.then(r => {
                        console.log(r.headers.get('content-type'))
                        if (r.status === 200) {
                            setProfileImgUrl(png)
                        }
                        else {
                            const resp = fetch(jpg, { method: 'HEAD' });
                            resp.then(r => {
                                console.log(r.headers.get('content-type'))
                                if (r.status === 200) {
                                    setProfileImgUrl(jpg)
                                    console.log(jpg)
                                }
                                else {
                                    const resp = fetch(JPG, { method: 'HEAD' });
                                    resp.then(r => {
                                        console.log(r.headers.get('content-type'))
                                        if (r.status === 200) {
                                            setProfileImgUrl(JPG)
                                            console.log(JPG)
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }, [suspect]);

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