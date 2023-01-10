import React, {useEffect, useState} from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import { Breadcrumb } from "antd"
import './Uploads.css'
import StreamDescription from "../../components/Streams/StreamDescription";
import ResultsLog from "../../components/Streams/ResultsLog";
import VideoInput from "../../components/Streams/VideoInput";
import {useLocation} from "react-router-dom";
import {UploadsApi} from "../../utils/interfaces";
import {VIDEO_TYPE} from "../../utils/constants";

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
        <div className='streams-page'>
            <div className='stream-mainbody'>
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
                        <StyledBreadcrumbLink  href="/">Uploaded Video Streams</StyledBreadcrumbLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb'}>{video?.location}</Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb-end'}>{video?.video_name}</Breadcrumb.Item>
                </Breadcrumb>
                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> {video?.video_name} Stream </div>
                </StyledSectionHeading>

                <div className={'stream-container'}>
                    <VideoInput />
                    <div className={'video-details'}>
                        <StreamDescription streamType={VIDEO_TYPE.UPLOAD} locationName={video?.location} source={video?.video_name} description={video?.description} createdAt={video?.created_at}/>
                        <ResultsLog />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Uploads;