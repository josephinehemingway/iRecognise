import React, {useState, useEffect} from 'react';
import './Blacklist.css';
import {StyledButton} from "../../components/reusable/button";
import {PlusOutlined} from "@ant-design/icons";
import {StyledSectionHeading, StyledTitle, StyledText} from "../../components/reusable/styledText";
import PersonCard from "../../components/reusable/Cards/PersonCard";
import {capitalise} from "../../utils/helperfunctions";
import {Spin} from 'antd'
import {BlacklistApi} from "../../utils/interfaces";
import {Link} from "react-router-dom";
import blankProfile from "../../assets/Images/blank-profile.png";
import AWS from 'aws-sdk'
import {s3Config} from "../../services/s3Config";

AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
})

// const S3_BUCKET = s3Config.bucketName;
// const REGION = s3Config.region;

// const s3 = new AWS.S3({region: REGION});

const Blacklist = () => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [blacklist, setBlacklist] = useState<BlacklistApi[]>([])
    const [curSuspectId, setCurSuspectId] = useState<number>(0)

    useEffect(() => {
        setLoading(true);
        fetch(`/blacklist`).then((res) =>
            res.json().then((data) => {
                setBlacklist(data);
            })
        );
        setLoading(false);
    }, []);

    useEffect(() => {
        fetch(`/nextcount?coll=blacklist`).then((res) =>
            res.json().then((data) => {
                setCurSuspectId(data);
            })
        );
    }, []);

    const blacklistCardsArray = blacklist.map((suspect) => {
        // s3.listObjects({ Bucket: S3_BUCKET, Prefix: `images/suspects/${suspect.suspectId!.toString()}` }, (err, data) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(data);
        //     }
        // });

        return (
            <PersonCard
                key={suspect.suspectId!}
                id={suspect.suspectId !== undefined ? suspect.suspectId : curSuspectId}
                imgUrl={blankProfile}
                name={suspect.name}
                status={capitalise(suspect.status)}
            />
        )
    });

    return (
        <div className='blacklist-page'>
            <div className='blacklist-mainbody'>
                <StyledTitle>
                    Blacklist Database
                </StyledTitle>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> Blacklisted Persons </div>
                    <Link to="/blacklist/new">
                        <StyledButton>
                            <PlusOutlined/>
                            Add New Suspect
                        </StyledButton>
                    </Link>
                </StyledSectionHeading>
                {loading ?
                    <div style={{ width: '100%',
                        height: '50%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <Spin tip="Loading..." />
                    </div> :
                        blacklist.length > 0 ?
                            <div className='blacklist-gallery'>
                                {blacklistCardsArray}
                            </div> :
                            <div style={{width: '100%'}}>
                                <StyledText color={'#ffffff80'} align={'start'} fontsize={'18px'}>
                                    No suspects found in database.
                                </StyledText>
                            </div>
                }
            </div>
        </div>
    );
};

export default Blacklist;