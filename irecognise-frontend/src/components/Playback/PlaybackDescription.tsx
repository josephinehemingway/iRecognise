import React, {useState, useEffect} from "react";
import "./styles.css";
import {
    StyledMediumTitle,
    StyledLabel,
    StyledText, StyledLink,
} from "../reusable/styledText";
import blankProfile from "../../assets/Images/blank-profile.png";
import {s3Config} from "../../services/s3Config";
import { S3_PREFIX } from "../../utils/constants";
import AWS from "aws-sdk";
import {BlacklistApi} from "../../utils/interfaces";
import {capitalise} from "../../utils/helperfunctions";
import {DANGER_STATUS} from "../../utils/constants";
import { WarningTwoTone, ExclamationCircleTwoTone, RightOutlined } from '@ant-design/icons';


type Props = {
    locationName: string | undefined;
    camera: string | undefined;
    timestamp: string | undefined;
    suspectId: number | undefined;
    similarity: string | undefined;
    imgUrl: string | undefined;
};

AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
})

const s3 = new AWS.S3();

const PlaybackDescription: React.FC<Props> = ({
    locationName,
    timestamp,
    camera,
    suspectId,
    similarity,
    imgUrl,
}) => {
    const [profileImg, setProfileImg] = useState(blankProfile)
    const [suspect, setSuspect] = useState<BlacklistApi>()

    useEffect(() => {
        if (suspectId) {
            fetch(`/suspect?id=${suspectId}`).then((res) =>
                res.json().then((data) => {
                    setSuspect(data);
                })
            );
        }
    }, [suspectId]);

    useEffect(() => {
        if (suspectId) {
            s3.listObjects({
                Bucket: s3Config.bucketName,
                Prefix: `images/suspects/${suspectId!.toString()}`
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data.Contents)
                    if (data.Contents && data.Contents.length > 0) {
                        const profilePicture = data.Contents[0].Key!
                        setProfileImg(S3_PREFIX + profilePicture)
                        console.log(profileImg)
                    }
                }
            });
        }
    },[suspectId])

    return (
        <>
            <div className={"suspect-description"}>
                <StyledMediumTitle marginbottom={"0.5rem"} fontsize={"20px"}>
                    Top Match
                </StyledMediumTitle>

                <div className={'profile-card'}>
                    <img alt={'profileimg'} src={profileImg} className='profile-img'/>
                    <div className={'profile-details'}>
                        <StyledLabel fontsize={'12px'}> ID </StyledLabel>
                        <StyledText align={'start'} marginbottom={'0.25rem'}> #{suspectId} </StyledText>

                        <StyledLabel fontsize={'12px'}> Name </StyledLabel>
                        <StyledText align={'start'} marginbottom={'0.25rem'}>  {suspect?.name}</StyledText>

                        <StyledLabel fontsize={'12px'}> Gender </StyledLabel>
                        <StyledText align={'start'} marginbottom={'0.25rem'}>  {suspect?.gender}</StyledText>

                        <StyledLabel fontsize={'12px'}> Status </StyledLabel>
                        <StyledText> {capitalise(suspect?.status)} {
                            capitalise(suspect?.status) === DANGER_STATUS.CRITICAL ||
                            capitalise(suspect?.status) === DANGER_STATUS.HIGH  ?
                                <WarningTwoTone twoToneColor='rgba(250,58,58,0.8)'/>
                                : capitalise(suspect?.status) === DANGER_STATUS.MED ?
                                    <ExclamationCircleTwoTone  twoToneColor='rgba(250,154,58,0.8)'/>
                                    : ''
                        }</StyledText>

                        <StyledLink margintop={'0.5rem'} href={`/blacklist/${suspectId}`} fontsize={'14px'}>
                            View Profile
                            <RightOutlined style={{fontSize:'12px'}}/>
                        </StyledLink>
                    </div>

                </div>
            </div>
            <div className={"video-description"}>
                <StyledMediumTitle marginbottom={"0.5rem"} fontsize={"20px"}>
                    Suspect Detected
                </StyledMediumTitle>

                <div className={'profile-card'}>
                    <img alt={'profileimg'} src={imgUrl} className='suspect-img'/>
                    <div className={'profile-details'}>
                        <div className={"desc-item"}>
                            <StyledLabel>Similarity Match</StyledLabel>
                            <StyledText>{similarity}%</StyledText>
                        </div>

                        <div className={"desc-item"}>
                            <StyledLabel>Location</StyledLabel>
                            <StyledText>{locationName}</StyledText>
                        </div>

                        <div className={"desc-item"}>
                            <StyledLabel>Source</StyledLabel>
                            <StyledText>{camera ? camera : "None"}</StyledText>
                        </div>

                        <div className={"desc-item"}>
                            <StyledLabel>Timestamp</StyledLabel>
                            <StyledText>{timestamp}</StyledText>
                        </div>

                        <div className={"desc-item"}>
                            <StyledLabel>Model</StyledLabel>
                            <StyledText>{"VGG-Face"}</StyledText>
                        </div>

                        <div className={"desc-item"}>
                            <StyledLabel>Measure</StyledLabel>
                            <StyledText>{"Cosine Distance"}</StyledText>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaybackDescription;
