import React, {useState, useMemo, useEffect} from 'react';
import {BlacklistApi} from "../../utils/interfaces";
import './styles.css'
import {StyledLabel, StyledText} from "../reusable/styledText";
import { StyledSelect, StyledTextArea, StyledPopConfirm } from '../reusable/styledDivs'
import {capitalise} from "../../utils/helperfunctions";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {BorderedButton, StyledButton} from "../reusable/button";
import {AGE_RANGE, DATE_FORMAT, IMAGES_S3_PREFIX, STATUS} from "../../utils/constants";
import {message} from 'antd';
import moment from 'moment'
import blankProfile from "../../assets/Images/blank-profile.png";

type Props = {
    suspect: BlacklistApi | undefined;
    handleClose: () => void;
    setSuspect: (data: BlacklistApi) => void;
}

const { Option } = StyledSelect

const EditMode: React.FC<Props> = ({suspect, handleClose, setSuspect}) => {

    const [status, setStatus] = useState<string>(capitalise(suspect!.status))
    const [age, setAgeRange] = useState<string>(suspect!.age)
    const [desc, setDesc] = useState<string>(suspect!.description)
    const [lastModified, setLastModified] = useState<string>(suspect!.last_modified!)
    const [loading, setLoading] = useState<boolean>(false)
    const [profileImgUrl, setProfileImgUrl] = useState<string>('')

    const handleStatusChange = (e: string) => setStatus(e) // dropdown status
    const handleAgeChange = (e: string) => setAgeRange(e) // dropdown age range
    const handleDescChange = (e: any) => setDesc(e.target.value) // text field

    useEffect(() => {
        if (suspect) {
            const url = `${IMAGES_S3_PREFIX}${suspect.suspectId!.toString()}/0`
            const jpeg = `${url}.jpeg`
            const png = `${url}.png`
            const jpg = `${url}.jpg`
            const JPG = `${url}.JPG`

            const resp = fetch(jpeg, { method: 'HEAD' });
            resp.then(r => {
                console.log(r.headers.get('content-type'))
                if (r.status === 200) {
                    setProfileImgUrl(jpeg)
                }
                else {
                    const resp = fetch(png, { method: 'HEAD' });
                    resp.then(r => {
                        console.log(r.headers.get('content-type'))
                        if (r.status === 200) {
                            setProfileImgUrl(png)
                        }
                        else {
                            const resp = fetch(jpg, { method: 'HEAD' });
                            resp.then(r => {
                                console.log(r.headers.get('content-type'))
                                if (r.status === 200) {
                                    setProfileImgUrl(jpg)
                                    console.log(jpg)
                                }
                                else {
                                    const resp = fetch(JPG, { method: 'HEAD' });
                                    resp.then(r => {
                                        console.log(r.headers.get('content-type'))
                                        if (r.status === 200) {
                                            setProfileImgUrl(JPG)
                                            console.log(JPG)
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }, [suspect]);

    const validateData = () => {
        let eArr: string[] = []
        if (
            age === "" || //age === undefined ||
            status === "" || //status === undefined ||
            desc === "" //|| desc === undefined
        ) {
            message.error("Mandatory fields are not filled")
            eArr.push("Mandatory fields are not filled")
        }
        return eArr
    }

    useEffect(() => {
        setLastModified(moment().format(DATE_FORMAT))
    }, [age, desc, status])

    const handleSave = () => {
        setLoading(true)

        // validate
        const tempErrors = validateData()

        if (tempErrors.length !== 0) {
            setLoading(false)
            return
        }

        // send data to server
        let editedSuspect: BlacklistApi = {
            "suspectId": suspect!.suspectId,
            "name": suspect!.name,
            "age": age,
            "gender": suspect!.gender,
            "status": status?.toLowerCase(),
            "description": desc,
            "last_seen_location": suspect!.last_seen_location,
            "last_seen_timestamp": suspect!.last_seen_timestamp,
            "last_modified": lastModified,
            "created_at": suspect!.created_at,
        }

        fetch(`/suspect?id=${suspect!.suspectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedSuspect)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
            })
        })

        setLoading(false)
        setSuspect(editedSuspect)

        // sets editing to false
        handleClose()

        // Success message
        message.success("Updated successfully!")
    }

    const statusOptions = useMemo(() => {
        return STATUS.map((b) => (
            <Option key={b} value={b}>
                {b}
            </Option>
        ))
    }, [])

    const ageOptions = useMemo(() => {
        return AGE_RANGE.map((b) => (
            <Option key={b} value={b}>
                {b}
            </Option>
        ))
    }, [])

    return (
        <div className={'details-card'}>
            <img
                className={'person-img'}
                alt={'Suspect'}
                height={'220px'}
                width={'150px'}
                src={profileImgUrl ? profileImgUrl : blankProfile} />
            { suspect &&
                <div className={'details-text'}>
                    <StyledLabel> ID </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> #{suspect.suspectId} </StyledText>

                    <StyledLabel> Name </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.name} </StyledText>

                    <StyledLabel> Gender </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {capitalise(suspect.gender)} </StyledText>

                    <StyledLabel marginbottom={'0.25rem'}> Status </StyledLabel>
                    <div style={{width: '40%'}}>
                        <StyledSelect
                            placeholder='Select Status'
                            value={status}
                            onChange={handleStatusChange}
                            width='100%'
                            showSearch
                            filterOption={(input: string, option: { children: string; }) => {
                                if (option) {
                                    return (
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    )
                                }
                                return false
                            }}
                        >
                            {statusOptions}
                        </StyledSelect>
                    </div>

                    <StyledLabel marginbottom={'0.25rem'}> Age Range </StyledLabel>
                    <div style={{width: '40%'}}>
                        <StyledSelect
                            placeholder='Select Age Range'
                            value={age}
                            onChange={handleAgeChange}
                            width='100%'
                            showSearch
                            filterOption={(input: string, option: { children: string; }) => {
                                if (option) {
                                    return (
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    )
                                }
                                return false
                            }}
                        >
                            {ageOptions}
                        </StyledSelect>
                    </div>

                    <StyledLabel marginbottom={'0.25rem'}> Description </StyledLabel>
                    <div style={{width: '75%', marginBottom: '0.25rem'}}>
                        <StyledTextArea
                            style={{background: 'transparent', color: 'white'}}
                            rows={2}
                            allowClear
                            placeholder='Enter Description'
                            value={desc}
                            onChange={handleDescChange}
                        />
                    </div>

                    <StyledLabel> Last Seen </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.last_seen_location}, {suspect.last_seen_timestamp} </StyledText>

                    <StyledLabel> Last Modified </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {lastModified} </StyledText>

                    <StyledLabel> Created At </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.created_at} </StyledText>
                </div>
            }
            <StyledPopConfirm
                placement="topLeft"
                title={<div style={{fontFamily: 'Lato'}}> Discard changes?</div>}
                onConfirm={handleClose}
                okText="Yes"
                cancelText="No">
                <BorderedButton right={'1rem'}>
                    <DeleteOutlined />
                    Cancel
                </BorderedButton>
            </StyledPopConfirm>
            <StyledButton onClick={handleSave} loading={loading}>
                <EditOutlined/>
                Save Edit
            </StyledButton>
        </div>
    );
};

export default EditMode;