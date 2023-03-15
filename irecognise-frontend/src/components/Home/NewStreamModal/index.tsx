import React, {useState} from 'react';
import {message, Modal} from "antd";
import { StyledButton } from '../../reusable/button';
import '../styles.css'
import {StyledLabel, StyledMediumTitle} from '../../reusable/styledText';
import {StyledInput, StyledPassword} from "../../reusable/styledDivs";
import {StreamsApi} from "../../../utils/interfaces";
import {capitalise} from "../../../utils/helperfunctions";
import moment from "moment";
import {DATE_FORMAT} from "../../../utils/constants";

type Props = {
    isModalOpen: boolean;
    handleClose: () => void;
}

const NewStreamModal: React.FC<Props> = ({isModalOpen, handleClose}) => {
    const [deviceName, setDeviceName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [ip, setIP] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [pw, setPW] = useState<string>("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    // const [nextVideoId, setNextVideoId] = useState<number | undefined>()

    // useEffect(() => {
    //     fetch(`/nextcount?coll=streams`).then((res) =>
    //         res.json().then((data) => {
    //             setNextVideoId(data);
    //         })
    //     );
    // }, []);

    const handleNameChange = (e: any) => setDeviceName(e.target.value); // text field
    const handleLocationChange = (e: any) => setLocation(e.target.value); // text field
    const handleIPChange = (e: any) => setIP(e.target.value); // text field
    const handleLoginChange = (e: any) => setLogin(e.target.value); // text field
    const handlePWChange = (e: any) => setPW(e.target.value); // text field

    const validateData = () => {
        let eArr: string[] = []
        if (
            deviceName === "" || deviceName === undefined ||
            ip === "" || ip === undefined ||
            location === "" || location === undefined ||
            login === undefined || pw === undefined
        ) {
            message.error("Mandatory fields are not filled")
            eArr.push("Mandatory fields are not filled")
        }
        return eArr
    }

    const handleCreateStream = () => {
        setIsSubmitting(true)

        const tempErrors = validateData()

        if (tempErrors.length !== 0) {
            setIsSubmitting(false)
            return
        }

        let newVideo: StreamsApi = {
            stream_name: capitalise(deviceName),
            ip: ip,
            login: login,
            pw: pw,
            location: capitalise(location),
            created_at: moment().format(DATE_FORMAT)
        };

        fetch(`/stream`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newVideo),
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
            });
        });

        setIsSubmitting(false)
        handleClose()
    }


    const submitFooter = () => {
        return (
            <span>
                <StyledButton onClick={handleClose} width={'150px'}>
                  Cancel
                </StyledButton>
                <StyledButton
                    width={'150px'}
                    onClick={handleCreateStream}
                    loading={isSubmitting}
                >
                  Submit
                </StyledButton>
              </span>
        )
    }

    return (
        <Modal
            centered
            className="modalStyle"
            open={isModalOpen}
            width={750}
            destroyOnClose
            footer={submitFooter()}
            onCancel={handleClose}
        >
            <StyledMediumTitle align={'start'} fontsize={'20px'}>
                Add New Stream
            </StyledMediumTitle>

            <div className={'upload-body'}>
                <div className={'details-newstream'}>
                    <StyledLabel marginbottom={"0.25rem"}> Stream Name * </StyledLabel>
                    <div style={{ width: "100%" }}>
                        <StyledInput
                            marginbottom={"0.5rem"}
                            placeholder="Enter Stream Name"
                            onChange={handleNameChange}
                            width="100%"
                        />
                    </div>

                    <StyledLabel marginbottom={"0.25rem"}> Location * </StyledLabel>
                    <div style={{ width: "100%" }}>
                        <StyledInput
                            marginbottom={"0.5rem"}
                            placeholder="Enter Location"
                            onChange={handleLocationChange}
                            width="100%"
                        />
                    </div>

                    <StyledLabel marginbottom={"0.25rem"}>Device IP Address *</StyledLabel>
                    <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                        <StyledInput
                            marginbottom={"0.5rem"}
                            placeholder="Enter IP Address"
                            onChange={handleIPChange}
                            width="100%"
                        />
                    </div>
                </div>
                <div className={'details-newstream'}>
                    <StyledLabel
                        marginbottom={"1.15rem"}
                        align={'start'}>
                        If your device is password protected, enter the credentials below.
                    </StyledLabel>

                    <StyledLabel marginbottom={"0.25rem"}>Device Login</StyledLabel>
                    <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                        <StyledInput
                            marginbottom={"0.5rem"}
                            placeholder="Enter Login"
                            onChange={handleLoginChange}
                            width="100%"
                        />
                    </div>

                    <StyledLabel marginbottom={"0.25rem"}>Device Password</StyledLabel>
                    <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                        <StyledPassword
                            marginbottom={"0.5rem"}
                            placeholder="Enter Password"
                            onChange={handlePWChange}
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default NewStreamModal;