import React, {useState} from "react";
import { StyledMediumTitle, StyledLabel } from "../reusable/styledText";
import { StyledButton } from "../reusable/button";
import { Upload, Modal, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./styles.css";
import { getBase64 } from "../../utils/helperfunctions";
import type { UploadProps, RcFile } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {uploadFileS3, listFilesS3} from "../../services/UploadFileS3";

const { Dragger } = Upload;

type Props = {
    suspectId: number | undefined;
}

const UploadImages: React.FC<Props> = ({suspectId}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [previewTitle, setPreviewTitle] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleOnPreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setIsPreviewOpen(true);
        setPreviewImage(file.url || (file.preview) as string);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    };

    const handleCancel = () => setIsPreviewOpen(false);

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

    const handleUpload = () => {
        setIsSubmitting(true)
        console.log(fileList);

        if (suspectId) {
            fileList.forEach((file) => {
                uploadFileS3(file.originFileObj, file.name, `images/suspects/${suspectId.toString()}`).then(() => {
                    console.log('Uploaded file', file.name);
                    const formData = new FormData();
                    formData.append('image_path',
                        `https://irecognise.s3-ap-southeast-1.amazonaws.com/images/suspects/${suspectId.toString()}/${file.name}`)

                    fetch('/representation', {
                        method: 'POST',
                        body: formData
                    }).then((result) => {
                        result.json().then((resp) => {
                            console.warn(resp);
                        });
                    });
                })
            })
            setFileList([])
            message.success('Uploaded files successfully!')
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(false)
    }

    const handleListFiles = async () => {
        const res = await listFilesS3(`images/suspects/${suspectId!.toString()}`)
        console.log('List files successfully')
        console.log(res)
    }

    return (
        <div className={"upload-card"}>
            <StyledMediumTitle marginbottom={"0.5rem"} fontsize={"20px"}>
                Image Upload
            </StyledMediumTitle>
            <StyledLabel align={'start'} marginbottom={"1rem"}>
                Have more images of this person? Upload them here for more
                accurate detections.{" "}
            </StyledLabel>
            <div style={{ width: "100%", height: '180px' }}>
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
                {fileList.length !== 0 && (
                    <div className={'upload-btn'}>
                        <StyledButton
                            onClick={handleUpload}
                            loading={isSubmitting}
                            top={'0.5rem'}
                            bottom={'2rem'}
                        >
                            Upload
                        </StyledButton>
                    </div>
                )}
                <div className={'upload-btn'}>
                    <StyledButton
                        onClick={handleListFiles}
                        top={'0.5rem'}
                        bottom={'2rem'}
                    >
                        List Files
                    </StyledButton>
                </div>
            </div>
            <Modal
                centered
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="Attached Images"
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
};

export default UploadImages;
