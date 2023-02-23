import React from 'react';
import {StyledLabel, StyledText, StyledLink} from '../reusable/styledText';
import {LogoutOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const Profile = () => {
    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <div>
            <div className="popover-container">
                <StyledLabel color={'grey'}>
                    Logged in as
                </StyledLabel>
                <StyledText color={'#5b5a8c'} marginbottom={'0.5rem'} align={'end'}>
                    {localStorage.getItem('username')}
                </StyledText>

                <StyledLabel color={'grey'}>
                    First Name
                </StyledLabel>
                <StyledText color={'#2d2d2d'} marginbottom={'0.5rem'} align={'end'}>
                    {localStorage.getItem('firstname')}
                </StyledText>

                <StyledLabel color={'grey'}>
                    Last Name
                </StyledLabel>
                <StyledText color={'#2d2d2d'} marginbottom={'0.5rem'} align={'end'}>
                    {localStorage.getItem('lastname')}
                </StyledText>

                <StyledLabel color={'grey'}>
                    Email
                </StyledLabel>
                <StyledText color={'#2d2d2d'} marginbottom={'0.5rem'} align={'end'}>
                    {localStorage.getItem('email')}
                </StyledText>

                <StyledLabel color={'grey'}>
                    Permissions
                </StyledLabel>
                <StyledText color={'#2d2d2d'} marginbottom={'1.5rem'} align={'end'}>
                    Admin
                </StyledText>

                <Link to={'/login'}>
                    <StyledLink
                        color={'#7976e8'}
                        hovercolor={'rgba(40,37,58,0.82)'}
                        onClick={handleLogout}>
                        <LogoutOutlined style={{marginRight: '0.5rem'}}/>
                        Sign out
                    </StyledLink>
                </Link>
            </div>

        </div>
    );
};

export default Profile;