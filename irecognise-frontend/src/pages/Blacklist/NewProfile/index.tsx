import React from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../../components/reusable/styledText";
import '../Blacklist.css'
import UploadImages from "../../../components/Blacklist/UploadImages";
import AddMode from "../../../components/Blacklist/AddMode";
import {Breadcrumb} from "antd";

const NewProfile: React.FC = () => {

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
                    <AddMode />
                    <UploadImages />
                </div>
            </div>
        </div>
    );
};

export default NewProfile;