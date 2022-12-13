import React, {useEffect, useState} from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import {Breadcrumb, Spin} from "antd";
import {BlacklistApi} from "../../utils/interfaces";
import { useLocation } from "react-router-dom";
import './BlacklistProfile.css'
import PersonalDetails from "../../components/Blacklist/PersonalDetails";

const BlacklistProfile: React.FC = () => {
    const id = useLocation().pathname.split("/")[2];

    const [suspect, setSuspect] = useState<BlacklistApi>()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        setLoading(true);
        fetch(`/suspect?id=${id}`).then((res) =>
            res.json().then((data) => {
                console.log(id)
                setSuspect(data);
                console.log(data);
                setLoading(false);
                console.log(suspect);
            })
        );
    }, [id]);

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
                            <PersonalDetails suspect={suspect} />
                            {/* Upload section*/}

                        </div>
                        {/* Historical Records*/}
                    </>
                }
            </div>
        </div>
    );
};

export default BlacklistProfile;