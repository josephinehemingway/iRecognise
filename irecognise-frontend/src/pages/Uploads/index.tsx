import React, {useEffect, useState} from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import { Breadcrumb } from "antd"
import './Uploads.css'
import StreamDescription from "../../components/Streams/StreamDescription";
import ResultsLog from "../../components/Streams/ResultsLog";
import {useLocation} from "react-router-dom";
import {UploadsApi} from "../../utils/interfaces";
import {VIDEO_TYPE} from "../../utils/constants";
import VideoPlayer from "../../components/Streams/VideoPlayer";
import {DeleteOutlined} from "@ant-design/icons";
import {BorderedButton} from "../../components/reusable/button";
import {StyledPopConfirm} from "../../components/reusable/styledDivs";

const Uploads: React.FC = () => {
    const id = useLocation().pathname.split("/")[2];
    const [video, setVideo] = useState<UploadsApi>()

    useEffect(() => {
        fetch(`/video?id=${id}`).then((res) =>
            res.json().then((data) => {
                setVideo(data);
            })
        );
    }, [id]);

    return (
        <div className='uploads-page'>
            <div className='uploads-mainbody'>
                <StyledTitle marginbottom={'0px'}>
                    Uploaded Video Streams
                </StyledTitle>
                <Breadcrumb
                    separator={''}
                    style={{
                        fontFamily: 'Lato Bold',
                        fontSize: "18px",
                        marginBottom: '1rem',
                    }}>
                    <Breadcrumb.Item>
                        <StyledBreadcrumbLink  href="/uploads">Uploaded Video Streams</StyledBreadcrumbLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb'}>{video?.location}</Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb-end'}>{video?.video_name}</Breadcrumb.Item>
                </Breadcrumb>
                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> {video?.video_name} Stream </div>
                    <StyledPopConfirm
                        placement="topLeft"
                        title={
                            <div style={{ fontFamily: "Lato" }}> Are you sure you want to delete this video?</div>
                        }
                        onConfirm={() => console.log('deleted')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <BorderedButton width={'50px'}>
                            <DeleteOutlined />
                        </BorderedButton>
                    </StyledPopConfirm>
                </StyledSectionHeading>

                <div className={'video-container'}>
                    { video &&
                        <VideoPlayer video={video} />
                    }
                    <div className={'upload-details'}>
                        <StreamDescription
                            streamType={VIDEO_TYPE.UPLOAD}
                            locationName={video?.location}
                            source={video?.video_name}
                            date={video?.date}
                            model={'VGG-Face'}
                            description={video?.description}
                            createdAt={video?.created_at}
                        />
                    </div>
                </div>
                <ResultsLog videoPath={video?.url_path}/>
            </div>
        </div>
    );
};

export default Uploads;