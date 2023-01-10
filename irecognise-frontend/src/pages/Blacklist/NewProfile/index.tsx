import React, {useEffect, useState} from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../../components/reusable/styledText";
import '../Blacklist.css'
import AddMode from "../../../components/Blacklist/AddMode";
import {Breadcrumb} from "antd";

const NewProfile: React.FC = () => {
    const [nextSuspectId, setNextSuspectId] = useState<number | undefined>()

    useEffect(() => {
        fetch(`/nextcount?coll=blacklist`).then((res) =>
            res.json().then((data) => {
                setNextSuspectId(data);
                console.log(data);
            })
        );
    }, []);

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
                    <Breadcrumb.Item className={'breadcrumb-end'}>New Suspect</Breadcrumb.Item>
                </Breadcrumb>

                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> Personal Information </div>
                </StyledSectionHeading>

                <div className={'profile-details'}>
                    <AddMode suspectId={nextSuspectId}/>
                </div>
            </div>
        </div>
    );
};

export default NewProfile;