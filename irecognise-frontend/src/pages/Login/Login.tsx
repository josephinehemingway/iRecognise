import React, {useState} from 'react';
import {StyledBreadcrumbLink, StyledLabel, StyledTitle} from "../../components/reusable/styledText";
import {StyledInput, StyledPassword} from "../../components/reusable/styledDivs";
import {StyledButton} from "../../components/reusable/button";
import './LoginRegister.css'
import {useNavigate} from "react-router-dom";
import {message} from "antd";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [pw, setPW] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [loginMessage, setLoginMessage] = useState<string>('');

    const handleUsernameChange = (e: any) => setUsername(e.target.value); // text field
    const handlePWChange = (e: any) => setPW(e.target.value); // text field

    const validateData = () => {
        let eArr: string[] = []
        if (
            username === "" || username === undefined ||
            pw === "" || pw === undefined
        ) {
            message.error("Mandatory fields are not filled")
            eArr.push("Mandatory fields are not filled")
        }
        return eArr
    }

    let navigate = useNavigate();

    async function handleLogin(username: string, pw: string) {
        setIsSubmitting(true)
        const tempErrors = validateData()

        if (tempErrors.length !== 0) {
            setIsSubmitting(false)
            return
        }

        setLoginMessage('')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'username': username.toLowerCase(), 'password': pw})
        };

        console.log(username, pw, requestOptions)

        await fetch('/login', requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json)
                if(json['status']==="success"){
                    console.log("login success:", json)
                    localStorage.clear()

                    // store the user in localStorage
                    localStorage.setItem('username', json['result']['username'])
                    localStorage.setItem('firstname', json['result']['firstname'])
                    localStorage.setItem('lastname', json['result']['lastname'])
                    localStorage.setItem('email', json['result']['email'])

                    setIsSubmitting(false)

                    let path = `/`;
                    navigate(path);
                }else{
                    console.log(json);
                    console.log("login failed");
                    setLoginMessage(json['error']);
                    setIsSubmitting(false)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='login-page'>
            <div className='login-mainbody'>
                <div className='title-left'>
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
                        Login
                    </StyledTitle>
                    <div className={'login-component'}>
                        <StyledLabel marginbottom={"0.25rem"}> Username *</StyledLabel>
                        <div style={{ width: "100%" }}>
                            <StyledInput
                                autoFocus
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
                            <StyledLabel color={'red'}>
                                {loginMessage}
                            </StyledLabel>
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                            <StyledButton
                                width="200px"
                                top={'1rem'}
                                bottom={'0.5rem'}
                                onClick={()=>{
                                    handleLogin(username, pw);
                                }}
                                loading={isSubmitting}>
                                Login
                            </StyledButton>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <StyledLabel>Dont have an account? <a href={'/register'}>Register</a></StyledLabel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;