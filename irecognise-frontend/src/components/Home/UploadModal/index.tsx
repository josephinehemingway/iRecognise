import React, {useEffect, useState} from 'react';
import {message, Modal, Upload} from "antd";
import { StyledButton } from '../../reusable/button';
import '../styles.css'
import {StyledLabel, StyledMediumTitle} from '../../reusable/styledText';
import {StyledInput, StyledTextArea} from "../../reusable/styledDivs";
import { InboxOutlined } from '@ant-design/icons';
import {UploadProps} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import {uploadFileS3} from "../../../services/UploadFileS3";
import {UploadsApi} from "../../../utils/interfaces";
import {capitalise} from "../../../utils/helperfunctions";
import moment from "moment";
import {DATE_FORMAT, UPLOAD_S3_PREFIX} from "../../../utils/constants";

const { Dragger } = Upload;

type Props = {
    isModalOpen: boolean;
    handleClose: () => void;
}

const UploadVideoModal: React.FC<Props> = ({isModalOpen, handleClose}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [nextVideoId, setNextVideoId] = useState<number | undefined>()

    useEffect(() => {
        fetch(`/nextcount?coll=uploads`).then((res) =>
            res.json().then((data) => {
                setNextVideoId(data);
            })
        );
    }, []);

    const handleNameChange = (e: any) => setName(e.target.value); // text field
    const handleDescChange = (e: any) => setDesc(e.target.value); // text field
    const handleLocationChange = (e: any) => setLocation(e.target.value); // text field

    const validateData = () => {
        let eArr: string[] = []
        if (
            name === "" || name === undefined ||
            desc === "" || desc === undefined ||
            location === "" || location === undefined
        ) {
            message.error("Mandatory fields are not filled")
            eArr.push("Mandatory fields are not filled")
        }
        return eArr
    }

    const handleUploadVideo = () => {
        setIsSubmitting(true)

        const tempErrors = validateData()

        if (tempErrors.length !== 0) {
            setIsSubmitting(false)
            return
        }

        let newVideo: UploadsApi = {
            video_name: capitalise(name),
            description: desc,
            location: capitalise(location),
            date: moment().format(DATE_FORMAT),
            url_path: UPLOAD_S3_PREFIX + `${nextVideoId!.toString()}/${name}.mp4`,
            created_at: moment().format(DATE_FORMAT)
        };

        fetch(`/video`, {
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

        if (fileList.length > 0) {
            fileList.forEach((file) => {
                uploadFileS3(file.originFileObj, capitalise(name), `uploads/${nextVideoId}`).then(() => {
                    console.log('Uploaded file', capitalise(name));
                    message.success(`Uploaded file ${name} successfully!`)
                    setFileList([])
                    setIsSubmitting(false)
                    handleClose()
                    window.location.reload();
                })
            })
        }
        setIsSubmitting(false)
        handleClose()
    }

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: "video/mp4",
        maxCount: 1,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    const submitFooter = () => {
        return (
            <span>
                <StyledButton onClick={handleClose} width={'150px'}>
                  Cancel
                </StyledButton>
                <StyledButton
                    width={'150px'}
                    onClick={handleUploadVideo}
                    loading={isSubmitting}
                    disabled={fileList.length === 0}
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
            width={1000}
            destroyOnClose
            footer={submitFooter()}
            onCancel={handleClose}
        >
            <StyledMediumTitle align={'start'} fontsize={'20px'}>
                Upload New Video
            </StyledMediumTitle>

            <div className={'upload-body'}>
                <div className={'details-upload'}>
                    <StyledLabel marginbottom={"0.25rem"}> Video Name * </StyledLabel>
                    <div style={{ width: "100%" }}>
                        <StyledInput
                            marginbottom={"0.5rem"}
                            placeholder="Enter Video Name"
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

                    <StyledLabel marginbottom={"0.25rem"}>Description *</StyledLabel>
                    <div style={{ width: "100%", marginBottom: "0.25rem" }}>
                        <StyledTextArea
                            marginbottom={"0.5rem"}
                            style={{
                                background: "transparent",
                                color: "white",
                            }}
                            rows={2}
                            allowClear
                            placeholder="Enter Description"
                            // value={desc}
                            onChange={handleDescChange}
                        />
                    </div>
                </div>
                <div className={'vid-upload-box'}>
                    <StyledLabel
                        align={'start'}
                        marginbottom={"0.25rem"}>Upload Video *</StyledLabel>
                    <Dragger
                        {...props}
                        beforeUpload={(file) => {
                            console.log({file});
                            return false
                        }}
                        onChange={handleChange}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support single upload only.
                        </p>
                    </Dragger>
                </div>
            </div>

        </Modal>
    );
};

export default UploadVideoModal;