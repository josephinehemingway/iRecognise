import React, {useEffect, useState} from 'react';
import './Cards.css';
import { StyledText, StyledLabel, StyledLink } from '../styledText';
import blankProfile from "../../../assets/Images/blank-profile.png";
import {s3Config} from "../../../services/s3Config";
import {S3_PREFIX} from "../../../utils/constants";
import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
})

const s3 = new AWS.S3();

type Props = {
    id: number;
    name: string;
    status: string;
}

const PersonCard: React.FC<Props> = ({id, name, status}) => {
    const [profileImg, setProfileImg] = useState(blankProfile)

    useEffect(() => {
        s3.listObjects({ Bucket: s3Config.bucketName, Prefix: `images/suspects/${id.toString()}` }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data.Contents);

                if (data.Contents && data.Contents.length > 0 ) {
                    const profilePicture = data.Contents[0].Key!

                    setProfileImg(S3_PREFIX + profilePicture)
                }
            }
        });
    },[])


    return (
        <div className={'person-card'}>
            <img alt={name} src={profileImg} height='100%' width= '30%' className='person-img-card'/>
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