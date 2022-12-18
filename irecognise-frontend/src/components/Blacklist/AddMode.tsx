import React, { useState, useMemo } from "react";
import { BlacklistApi } from "../../utils/interfaces";
import "./styles.css";
import { StyledLabel } from "../reusable/styledText";
import {
    StyledSelect,
    StyledTextArea,
    StyledPopConfirm,
    StyledInput,
} from "../reusable/styledDivs";
import {PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import { BorderedButton, StyledButton } from "../reusable/button";
import {AGE_RANGE, DATE_FORMAT, GENDER, STATUS} from "../../utils/constants";
import { message } from "antd";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import {capitalise} from "../../utils/helperfunctions";

const { Option } = StyledSelect;

const AddMode: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [age, setAgeRange] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [lastSeenLocation, setLastSeenLocation] = useState<string>("");
    const [lastSeenTimestamp, setLastSeenTimestamp] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const handleNameChange = (e: any) => setName(e.target.value); // text field
    const handleAgeChange = (e: string) => setAgeRange(e); // dropdown age range
    const handleGenderChange = (e: string) => setGender(e); // dropdown gender
    const handleStatusChange = (e: string) => setStatus(e); // dropdown status
    const handleDescChange = (e: any) => setDesc(e.target.value); // text field
    const handleLSLocChange = (e: any) => setLastSeenLocation(e.target.value); // text field
    const handleLSTimeChange = (e: any) => setLastSeenTimestamp(e.target.value); // text field

    const validateData = () => {
        let eArr: string[] = []
        if (
            name === "" || name === undefined ||
            age === "" || age === undefined ||
            gender === "" || gender === undefined ||
            status === "" || status === undefined ||
            desc === "" || desc === undefined ||
            lastSeenLocation === undefined ||
            lastSeenTimestamp === undefined
        ) {
            message.error("Mandatory fields are not filled")
            eArr.push("Mandatory fields are not filled")
        }
        return eArr
    }

    let navigate = useNavigate();

    const handleCancel = () => {
        let path = `/blacklist`;
        navigate(path);
    }

    const handleSave = () => {
        setLoading(true);

        // validate
        const tempErrors = validateData()

        if (tempErrors.length !== 0) {
            setLoading(false)
            return
        }

        // send data to server
        let newSuspect: BlacklistApi = {
            name: capitalise(name),
            age: age,
            gender: gender,
            status: status?.toLowerCase(),
            description: desc,
            last_seen_location: lastSeenLocation,
            last_seen_timestamp: lastSeenTimestamp,
            last_modified: moment().format(DATE_FORMAT),
            created_at: moment().format(DATE_FORMAT)
        };

        fetch(`/suspect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSuspect),
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
            });
        });

        setLoading(false);

        // route to blacklist page
        let path = `/blacklist`;
        navigate(path);
        window.location.reload();

        // Success message
        message.success("Added successfully!");
    };

    const statusOptions = useMemo(() => {
        return STATUS.map((b) => (
            <Option key={b} value={b}>
                {b}
            </Option>
        ));
    }, []);

    const ageOptions = useMemo(() => {
        return AGE_RANGE.map((b) => (
            <Option key={b} value={b}>
                {b}
            </Option>
        ));
    }, []);

    const genderOptions = useMemo(() => {
        return GENDER.map((b) => (
            <Option key={b} value={b}>
                {b}
            </Option>
        ));
    }, []);

    return (
        <div className={"details-card"}>
            <img
                className={"person-img"}
                alt={"Suspect"}
                height={"220px"}
                width={"15%"}
                src={
                    "https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU"
                }
            />
            <div className={"details-text"}>
                <StyledLabel marginbottom={"0.25rem"}> Name * </StyledLabel>
                <div style={{ width: "40%" }}>
                    <StyledInput
                        marginbottom={"0.5rem"}
                        placeholder="Enter Full Name"
                        onChange={handleNameChange}
                        width="100%"
                    />
                </div>


                <StyledLabel marginbottom={"0.25rem"}> Gender *</StyledLabel>
                <div style={{ width: "40%" }}>
                    <StyledSelect
                        marginbottom={"0.5rem"}
                        placeholder="Select Gender"
                        onChange={handleGenderChange}
                        width="100%"
                        showSearch
                        filterOption={(
                            input: string,
                            option: { children: string }
                        ) => {
                            if (option) {
                                return (
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                );
                            }
                            return false;
                        }}
                    >
                        {genderOptions}
                    </StyledSelect>
                </div>

                <StyledLabel marginbottom={"0.25rem"}> Status *</StyledLabel>
                <div style={{ width: "40%" }}>
                    <StyledSelect
                        marginbottom={"0.5rem"}
                        placeholder="Select Status"
                        onChange={handleStatusChange}
                        width="100%"
                        showSearch
                        filterOption={(
                            input: string,
                            option: { children: string }
                        ) => {
                            if (option) {
                                return (
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                );
                            }
                            return false;
                        }}
                    >
                        {statusOptions}
                    </StyledSelect>
                </div>

                <StyledLabel marginbottom={"0.25rem"}>Age Range *</StyledLabel>
                <div style={{ width: "40%" }}>
                    <StyledSelect
                        marginbottom={"0.5rem"}
                        placeholder="Select Age Range"
                        onChange={handleAgeChange}
                        width="100%"
                        showSearch
                        filterOption={(
                            input: string,
                            option: { children: string }
                        ) => {
                            if (option) {
                                return (
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                );
                            }
                            return false;
                        }}
                    >
                        {ageOptions}
                    </StyledSelect>
                </div>

                <StyledLabel marginbottom={"0.25rem"}>Description *</StyledLabel>
                <div style={{ width: "60%", marginBottom: "0.25rem" }}>
                    <StyledTextArea
                        marginbottom={"0.5rem"}
                        style={{
                            background: "transparent",
                            color: "white",
                        }}
                        rows={2}
                        allowClear
                        placeholder="Enter Description"
                        value={desc}
                        onChange={handleDescChange}
                    />
                </div>

                <StyledLabel marginbottom={"0.25rem"}>Last Seen Location</StyledLabel>
                <div style={{ width: "40%" }}>
                    <StyledInput
                        marginbottom={"0.5rem"}
                        placeholder="Enter Last Seen Location"
                        onChange={handleLSLocChange}
                        width="100%"
                    />
                </div>

                <StyledLabel marginbottom={"0.25rem"}>Last Seen Timestamp</StyledLabel>
                <div style={{ width: "40%" }}>
                    <StyledInput
                        marginbottom={"0.5rem"}
                        placeholder="Enter Last Seen Time"
                        onChange={handleLSTimeChange}
                        width="100%"
                    />
                </div>
            </div>

            <StyledPopConfirm
                placement="topLeft"
                title={
                    <div style={{ fontFamily: "Lato" }}> Discard changes?</div>
                }
                onConfirm={handleCancel}
                okText="Yes"
                cancelText="No"
            >
                <BorderedButton right={"1rem"}>
                    <DeleteOutlined />
                    Cancel
                </BorderedButton>
            </StyledPopConfirm>
            <StyledButton onClick={handleSave} loading={loading}>
                <PlusOutlined/>
                Add New Suspect
            </StyledButton>

        </div>
    );
};

export default AddMode;
