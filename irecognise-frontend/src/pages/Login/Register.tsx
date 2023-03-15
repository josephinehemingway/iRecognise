import React, {useState} from 'react';
import {StyledBreadcrumbLink, StyledLabel, StyledTitle} from "../../components/reusable/styledText";
import {StyledInput, StyledPassword} from "../../components/reusable/styledDivs";
import {StyledButton} from "../../components/reusable/button";
import './LoginRegister.css'
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import moment from "moment";
import {DATE_FORMAT} from "../../utils/constants";
import {UserApi} from "../../utils/interfaces";
import {capitalise} from "../../utils/helperfunctions";
import Logo from "../../assets/logo-large.png";

const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [pw, setPW] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [telegramID, setTelegramID] = useState<string>("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState(null)
    const [registerFailMessage, setRegisterFailMessage] = useState(null)
    const [registerFailed, setRegisterFailed] = useState(false)

    const handleUsernameChange = (e: any) => setUsername(e.target.value); // text field
    const handlePWChange = (e: any) => setPW(e.target.value); // text field
    const handleConfirmPWChange = (e: any) => setConfirmPassword(e.target.value); // text field
    const handleFirstNameChange = (e: any) => setFirstName(e.target.value); // text field
    const handleLastNameChange = (e: any) => setLastName(e.target.value); // text field
    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handleTelegramChange = (e: any) => setTelegramID(e.target.value);

    let messageSection = null

    const validateData = () => {
        let eArr: string[] = []
        if (
            username === "" || username === undefined ||
            pw === "" || pw === undefined ||
            email === "" || email === undefined ||
            firstName === "" || firstName === undefined ||
            lastName === "" || lastName === undefined ||
            telegramID === "" || telegramID === undefined ||
            confirmPassword === "" || confirmPassword === undefined
        ) {
            message.error("Mandatory fields are not filled")
            eArr.push("Mandatory fields are not filled")
        }

        if (
            confirmPassword !== pw
        )
        {
            message.error("Confirm password does not match password")
            eArr.push("Confirm password does not match password")
        }
        return eArr
    }

    let navigate = useNavigate();

    async function handleRegister(username: string, pw: string, firstName: string, lastName: string, email: string, telegramID: string) {
        setIsSubmitting(true)
        const tempErrors = validateData()

        if (tempErrors.length !== 0) {
            setIsSubmitting(false)
            return
        }

        let newUser: UserApi = {
            username: username.toLowerCase(),
            password: pw,
            firstname: capitalise(firstName),
            lastname: capitalise(lastName),
            email: email.toLowerCase(),
            telegramID: parseInt(telegramID),
            created_at: moment().format(DATE_FORMAT),
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        };

        await fetch('/register', requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json)
                if(json['status']!==400){
                    console.log("register success:", json)
                    setRegisterFailed(false)
                    setRegisterFailMessage(null)
                    setRegisterSuccessMessage(json['result'])

                    localStorage.clear()

                    // store the user in localStorage
                    localStorage.setItem('username', username)
                    localStorage.setItem('firstname', firstName)
                    localStorage.setItem('lastname', lastName)
                    localStorage.setItem('email', email)
                    localStorage.setItem('telegram', telegramID)
                    setIsSubmitting(false)

                    let path = `/`;
                    navigate(path);
                }else{
                    console.log(json)
                    setRegisterFailed(true)
                    setRegisterSuccessMessage(null)
                    setRegisterFailMessage(json['error'])
                    setIsSubmitting(false)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    if(registerFailed){
        if(registerFailMessage){
            messageSection = (
                <div className="registerMessage">
                    Sorry, failed registration: {registerFailMessage}
                </div>
            )
        }
    }else{
        if (registerSuccessMessage){
            messageSection = (
                <div className="registerMessage">
                    {registerSuccessMessage}
                </div>
            )
        }
    }

    return (
        <div className='login-page'>
            <div className='login-mainbody'>
                <div className='title-left'>
                    <StyledTitle fontsize={'75px'} marginbottom={'0'}>
                        <img src={Logo} alt={'logo'} height={75} width={75} style={{marginRight: '1rem'}}/>
                        iRecognise
                    </StyledTitle>
                    <StyledBreadcrumbLink fontsize={'20px'} color={'#9491da'} marginbottom={'3rem'}>
                        Get started with this all-in-one surveillance system that provides real-time monitoring,
                        video-analytics and more.
                    </StyledBreadcrumbLink>
                </div>
                <div className='register-right'>
                    <StyledTitle fontsize={'25px'}>
                       Register
                    </StyledTitle>
                    <div className={'register-component'}>
                        <div className={'register-details'}>
                            <StyledLabel marginbottom={"0.25rem"}> Username *</StyledLabel>
                            <div style={{ width: "100%" }}>
                                <StyledInput
                                    autoFocus
                                    marginbottom={"0.5rem"}
                                    placeholder="Enter Username"
                                    onChange={handleUsernameChange}
                                    width="100%"
                                />
                            </div>

                            <StyledLabel marginbottom={"0.25rem"}>Password *</StyledLabel>
                            <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                                <StyledPassword
                                    marginbottom={"0.5rem"}
                                    placeholder="Enter Password"
                                    onChange={handlePWChange}
                                    width="100%"
                                />
                            </div>

                            <StyledLabel marginbottom={"0.25rem"}>Confirm Password *</StyledLabel>
                            <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                                <StyledPassword
                                    marginbottom={"0.5rem"}
                                    placeholder="Enter Password Again"
                                    onChange={handleConfirmPWChange}
                                    width="100%"
                                />
                            </div>
                        </div>
                        <div className={'register-details'}>
                            <StyledLabel marginbottom={"0.25rem"}>First Name *</StyledLabel>
                            <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                                <StyledInput
                                    marginbottom={"0.5rem"}
                                    placeholder="Enter First Name"
                                    onChange={handleFirstNameChange}
                                    width="100%"
                                />
                            </div>

                            <StyledLabel marginbottom={"0.25rem"}>Last Name *</StyledLabel>
                            <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                                <StyledInput
                                    marginbottom={"0.5rem"}
                                    placeholder="Enter Last Name"
                                    onChange={handleLastNameChange}
                                    width="100%"
                                />
                            </div>

                            <StyledLabel marginbottom={"0.25rem"}>Email *</StyledLabel>
                            <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                                <StyledInput
                                    marginbottom={"0.5rem"}
                                    placeholder="Enter Email"
                                    onChange={handleEmailChange}
                                    width="100%"
                                />
                            </div>

                            <StyledLabel marginbottom={"0.25rem"}>Telegram User ID *</StyledLabel>
                            <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                                <StyledInput
                                    marginbottom={"0.5rem"}
                                    placeholder="Enter Telegram User ID"
                                    onChange={handleTelegramChange}
                                    width="100%"
                                />
                            </div>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                                <StyledButton
                                    width="200px"
                                    top={'1rem'}
                                    bottom={'0.5rem'}
                                    onClick={()=>{
                                        handleRegister(username, pw, firstName, lastName, email, telegramID);
                                    }}
                                    loading={isSubmitting}>
                                    Register
                                </StyledButton>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <StyledLabel color={'red'}>{messageSection}</StyledLabel>
                                    <StyledLabel>Already have an account? <a href={'/login'}>Login</a></StyledLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;