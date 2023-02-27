import React, { useState, useMemo } from "react";
import { BlacklistApi } from "../../utils/interfaces";
import "./styles.css";
import {StyledLabel} from "../reusable/styledText";
import {
    StyledSelect,
    StyledTextArea,
    StyledPopConfirm,
    StyledInput,
} from "../reusable/styledDivs";
import {PlusOutlined, DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import { BorderedButton, StyledButton } from "../reusable/button";
import {AGE_RANGE, DATE_FORMAT, GENDER, IMAGES_S3_PREFIX, STATUS} from "../../utils/constants";
import {message, Modal, Upload} from "antd";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import {capitalise, getBase64} from "../../utils/helperfunctions";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile, UploadProps} from "antd/es/upload";
import {uploadFileS3} from "../../services/UploadFileS3";
import blankProfile from "../../assets/Images/blank-profile.png";

const { Option } = StyledSelect;
const { Dragger } = Upload;

type Props = {
    suspectId: number | undefined;
}

const AddMode: React.FC<Props> = ({suspectId}) => {
    const [name, setName] = useState<string>("");
    const [age, setAgeRange] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [lastSeenLocation, setLastSeenLocation] = useState<string>("");
    const [lastSeenTimestamp, setLastSeenTimestamp] = useState<string>("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [previewTitle, setPreviewTitle] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const handleNameChange = (e: any) => setName(e.target.value); // text field
    const handleAgeChange = (e: string) => setAgeRange(e); // dropdown age range
    const handleGenderChange = (e: string) => setGender(e); // dropdown gender
    const handleStatusChange = (e: string) => setStatus(e); // dropdown status
    const handleDescChange = (e: any) => setDesc(e.target.value); // text field
    const handleLSLocChange = (e: any) => setLastSeenLocation(e.target.value); // text field
    const handleLSTimeChange = (e: any) => setLastSeenTimestamp(e.target.value); // text field

    const handleOnPreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setIsPreviewOpen(true);
        setPreviewImage(file.url || (file.preview) as string);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    };

    const handleCloseImage = () => setIsPreviewOpen(false);

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        accept: "image/*",
        listType: "picture-card",
        maxCount: 10,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

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

        // upload images to s3
        if (suspectId && fileList.length > 0) {
            fileList.forEach((file, index) => {
                uploadFileS3(file.originFileObj, index.toString(), `images/suspects/${suspectId.toString()}`).then(() => {
                    console.log('Uploaded file', file.name);
                })

                if (file.originFileObj !== undefined) {
                    const fileExt = file.name.split('.').slice(-1)[0]
                    const formData = new FormData();
                    formData.append('image_path',
                        `${IMAGES_S3_PREFIX}${suspectId.toString()}/${index}.${fileExt}`)

                    fetch('/representation', {
                        method: 'POST',
                        body: formData
                    }).then((result) => {
                        result.json().then((resp) => {
                            console.warn(resp);
                        });
                    });
                }
            })
            setFileList([])
            setLoading(false);

            message.success('Uploaded files successfully!')
            message.success("Added successfully!");

            // route to blacklist page
            let path = `/blacklist`;
            navigate(path);
            return
        }
        return
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
        <div className={"details-card-addmode"}>
            <img
                className={"person-img"}
                alt={"Suspect"}
                height={"220px"}
                width={"150px"}
                src={blankProfile}
            />
            <div className={"details-text-addmode"}>
                <StyledLabel marginbottom={"0.25rem"}> Name * </StyledLabel>
                <div style={{ width: "60%" }}>
                    <StyledInput
                        marginbottom={"0.5rem"}
                        placeholder="Enter Full Name"
                        onChange={handleNameChange}
                        width="100%"
                    />
                </div>

                <StyledLabel marginbottom={"0.25rem"}> Gender *</StyledLabel>
                <div style={{ width: "60%" }}>
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
                <div style={{ width: "60%" }}>
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
                <div style={{ width: "60%" }}>
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
                <div style={{ width: "80%", marginBottom: "0.25rem" }}>
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
                <div style={{ width: "60%" }}>
                    <StyledInput
                        marginbottom={"0.5rem"}
                        placeholder="Enter Last Seen Location"
                        onChange={handleLSLocChange}
                        width="100%"
                    />
                </div>

                <StyledLabel marginbottom={"0.25rem"}>Last Seen Timestamp</StyledLabel>
                <div style={{ width: "60%" }}>
                    <StyledInput
                        marginbottom={"0.5rem"}
                        placeholder="Enter Last Seen Time"
                        onChange={handleLSTimeChange}
                        width="100%"
                    />
                </div>
            </div>
            <div className={'upload-img-new-suspect'}>
                <StyledLabel marginbottom={"0.25rem"}>Images Upload</StyledLabel>
                <div style={{ width: "85%", height: '175px' }}>
                    <Dragger
                        className={"upload-box"}
                        {...props}
                        fileList={fileList}
                        showUploadList={{showRemoveIcon: true}}
                        beforeUpload={(file) => {
                            console.log({file});
                            return false
                        }}
                        onPreview={handleOnPreview}
                        onChange={handleChange}
                    >
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint" style={{marginBottom: '1rem'}}>
                            You may upload multiple items
                        </p>
                    </Dragger>
                </div>
                <Modal
                    centered
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCloseImage}
                >
                    <img
                        alt="Attached Images"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </Modal>
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
            <StyledButton onClick={handleSave} loading={loading} disabled={fileList.length === 0}>
                <PlusOutlined/>
                Add New Suspect
            </StyledButton>
        </div>
    );
};

export default AddMode;
