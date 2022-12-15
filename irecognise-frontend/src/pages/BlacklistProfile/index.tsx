import React, {useEffect, useState} from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import {Breadcrumb, Spin} from "antd";
import {BlacklistApi} from "../../utils/interfaces";
import { useLocation } from "react-router-dom";
import './BlacklistProfile.css'
import PersonalDetails from "../../components/Blacklist/PersonalDetails";
import UploadImages from "../../components/Blacklist/UploadImages";
import EditMode from "../../components/Blacklist/EditMode";

const BlacklistProfile: React.FC = () => {
    const id = useLocation().pathname.split("/")[2];

    const [suspect, setSuspect] = useState<BlacklistApi>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [isEditing, setIsEditing] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true);
        fetch(`/suspect?id=${id}`).then((res) =>
            res.json().then((data) => {
                setSuspect(data);
                console.log(data);
                setLoading(false);
            })
        );
    }, [id]);

    useEffect(() => {
        console.log(isEditing)
    }, [isEditing])

    const handleSave = () => {
        console.log(isEditing);
        setIsEditing(false)
        // setIsEditing(!isEditing);
    }

    const handleEdit = () => {
        console.log(isEditing);
        setIsEditing(true)
        // setIsEditing(!isEditing)
    }

    return (
        <div className='blacklist-profile-page'>
            <div className='blacklist-profile-mainbody'>
                <StyledTitle marginbottom={'0px'}>
                    Blacklist Database
                </StyledTitle>
                <Breadcrumb
                    separator={''}
                    style={{
                        fontFamily: 'Lato Bold',
                        fontSize: "18px",
                        marginBottom: '1rem',
                    }}>
                    <Breadcrumb.Item>
                        <StyledBreadcrumbLink  href="/blacklist">Blacklisted Persons</StyledBreadcrumbLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb-end'}>{suspect?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> Personal Information </div>
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
                    <>
                        <div className={'profile-details'}>
                            { !isEditing ?
                                <PersonalDetails suspect={suspect} handleEdit={handleEdit}/> :
                                <EditMode suspect={suspect} handleSave={handleSave}/>}
                            <UploadImages />
                        </div>
                        {/* Historical Records*/}
                    </>
                }
            </div>
        </div>
    );
};

export default BlacklistProfile;