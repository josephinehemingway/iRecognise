import React, {useEffect, useState} from 'react';
import './Cards.css';
import { StyledText, StyledLabel, StyledLink } from '../styledText';
import blankProfile from "../../../assets/Images/blank-profile.png";
import {s3Config} from "../../../services/s3Config";
import {S3_PREFIX, STATUS_STYLES_MAP} from "../../../utils/constants";
import AWS from 'aws-sdk'
import { Tag } from 'antd';

AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
})

const s3 = new AWS.S3();

type Props = {
    id: number;
    name: string;
    status: string;
    gender: string;
}

const PersonCard: React.FC<Props> = ({id, name, status}) => {
    const [profileImg, setProfileImg] = useState(blankProfile)

    useEffect(() => {
        s3.listObjects({ Bucket: s3Config.bucketName, Prefix: `images/suspects/${id.toString()}` }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data.Contents && data.Contents.length > 0 ) {
                    const profilePicture = data.Contents[0].Key!
                    setProfileImg(S3_PREFIX + profilePicture)
                }
            }
        });
    },[])


    return (
        <div className={'person-card'}>
            <img alt={name} src={profileImg} height='100%' width= '35%' className='person-img-card'/>
            <div className={'person-details'}>

                <StyledLabel fontsize={'13px'}> ID </StyledLabel>
                <StyledText fontsize={'15px'} marginbottom={'0.25rem'} align={'start'}> #{id} </StyledText>

                <StyledLabel fontsize={'13px'}> Name </StyledLabel>
                <StyledText fontsize={'15px'} marginbottom={'0.25rem'} align={'start'}> {name} </StyledText>

                <StyledLabel fontsize={'13px'}> Status </StyledLabel>
                <Tag color={STATUS_STYLES_MAP[status].color} > {status} </Tag>

                <StyledLink href={`/blacklist/${id}`}
                            margintop={'1rem'}
                            fontsize={'13px'}> View Details </StyledLink>
            </div>

        </div>
    );
};

export default PersonCard;