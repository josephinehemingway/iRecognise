import React from 'react';
import {StyledMediumTitle, StyledLabel} from "../reusable/styledText";
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './styles.css'

const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


const UploadImages = () => {
    return (
        <div className={'upload-card'}>
            <StyledMediumTitle marginbottom={'0.5rem'} fontsize={'20px'}>Image Upload</StyledMediumTitle>
            <StyledLabel marginbottom={'1rem'}> Have more images of this person? Upload them here for more accurate detections. </StyledLabel>

            <div style={{width: '100%'}}>
                <Dragger {...props} className={'upload-box'}>
                    <p className="ant-upload-drag-icon" style={{width: '100%'}}>
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                    </p>
                </Dragger>
            </div>
        </div>
    );
};

export default UploadImages;