import React, {useState, useMemo} from 'react';
import {BlacklistApi} from "../../utils/interfaces";
import './styles.css'
import {StyledLabel, StyledText} from "../reusable/styledText";
import { StyledSelect, StyledTextArea } from '../reusable/styledDivs'
import {capitalise} from "../../utils/helperfunctions";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {BorderedButton, StyledButton} from "../reusable/button";
import {AGE_RANGE, STATUS} from "../../utils/constants";

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
    const [loading, setLoading] = useState<boolean>(false)
    // const [alertVisible, setAlertVisible] = useState<boolean>(false)

    const handleStatusChange = (e: string) => setStatus(e) // dropdown status
    const handleAgeChange = (e: string) => setAgeRange(e) // dropdown age range
    const handleDescChange = (e: any) => setDesc(e.target.value) // text field

    const handleSave = () => {
        setLoading(true)

        // validate

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
            "last_modified": suspect!.last_modified,
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

        // Success message, get request again

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
                width={'15%'}
                src={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'} />
            { suspect &&
                <div className={'details-text'}>
                    <StyledLabel> ID </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> #{suspect.suspectId} </StyledText>

                    <StyledLabel> Name </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.name} </StyledText>

                    <StyledLabel> Gender </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {capitalise(suspect.gender)} </StyledText>

                    <StyledLabel> Status </StyledLabel>
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

                    <StyledLabel> Age Range </StyledLabel>
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

                    <StyledLabel> Description </StyledLabel>
                    <div style={{width: '60%', marginBottom: '0.25rem'}}>
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
                    <StyledText marginbottom={'0.5rem'}> {suspect.last_modified} </StyledText>

                    <StyledLabel> Created At </StyledLabel>
                    <StyledText marginbottom={'0.5rem'}> {suspect.last_modified} </StyledText>
                </div>
            }
            {/*to add confirm pop up*/}
            <BorderedButton onClick={handleClose} right={'1rem'}>
                <DeleteOutlined />
                Cancel
            </BorderedButton>
            <StyledButton onClick={handleSave} loading={loading}>
                <EditOutlined/>
                Save Edit
            </StyledButton>
        </div>
    );
};

export default EditMode;