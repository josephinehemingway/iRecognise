import React, {useState} from 'react';
import {StyledBreadcrumbLink, StyledLabel, StyledTitle} from "../../components/reusable/styledText";
import {StyledInput, StyledPassword} from "../../components/reusable/styledDivs";
import {StyledButton} from "../../components/reusable/button";
import './Login.css'
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [pw, setPW] = useState<string>("");
    // const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleUsernameChange = (e: any) => setUsername(e.target.value); // text field
    const handlePWChange = (e: any) => setPW(e.target.value); // text field

    const handleLogin = () => {
        console.log(username, pw);
    }

    return (
        <div className='login-page'>
            <div className='login-mainbody'>
                <div className='login-left'>
                    <StyledTitle fontsize={'75px'} marginbottom={'0'}>
                        iRecognise
                    </StyledTitle>
                    <StyledBreadcrumbLink fontsize={'20px'} color={'#9491da'}>
                        Get started with this all-in-one surveillance system that provides real-time monitoring,
                        video-analytics and more.
                    </StyledBreadcrumbLink>

                </div>
                <div className='login-right'>
                    <StyledTitle fontsize={'25px'}>
                        Login or Register
                    </StyledTitle>
                    <div className={'login-component'}>
                        <StyledLabel marginbottom={"0.25rem"}> Username *</StyledLabel>
                        <div style={{ width: "100%" }}>
                            <StyledInput
                                marginbottom={"0.5rem"}
                                placeholder="Enter username"
                                onChange={handleUsernameChange}
                                width="100%"
                            />
                        </div>

                        <StyledLabel marginbottom={"0.25rem"}>Password *</StyledLabel>
                        <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                            <StyledPassword
                                marginbottom={"0.5rem"}
                                placeholder="Enter password"
                                onChange={handlePWChange}
                                width="100%"
                            />
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                            <Link to={'/'}>
                                <StyledButton
                                    width="200px"
                                    top={'1rem'}
                                    bottom={'0.5rem'}
                                    onClick={handleLogin}>
                                    Login
                                </StyledButton>
                            </Link>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <StyledLabel>Dont have an account? Register</StyledLabel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;