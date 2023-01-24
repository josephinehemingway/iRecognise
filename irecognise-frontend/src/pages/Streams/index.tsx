import React, {useEffect, useState} from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import { Breadcrumb } from "antd"
import './Streams.css'
import StreamDescription from "../../components/Streams/StreamDescription";
import ResultsLog from "../../components/Streams/ResultsLog";
import VideoInput from "../../components/Streams/VideoInput";
import {useLocation} from "react-router-dom";
import {StreamsApi} from "../../utils/interfaces";
import {VIDEO_TYPE} from "../../utils/constants";

const Streams: React.FC = () => {
    const id = useLocation().pathname.split("/")[2];
    const [stream, setStream] = useState<StreamsApi>()

    useEffect(() => {
        fetch(`/stream?id=${id}`).then((res) =>
            res.json().then((data) => {
                setStream(data);
            })
        );
    }, [id]);

    return (
        <div className='streams-page'>
            <div className='stream-mainbody'>
                <StyledTitle marginbottom={'0px'}>
                    Live Video Streams
                </StyledTitle>
                <Breadcrumb
                    separator={''}
                    style={{
                        fontFamily: 'Lato Bold',
                        fontSize: "18px",
                        marginBottom: '1rem',
                        }}>
                    <Breadcrumb.Item>
                        <StyledBreadcrumbLink  href="/">Live Video Streams</StyledBreadcrumbLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb'}>{stream?.location}</Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb-end'}>{stream?.stream_name}</Breadcrumb.Item>
                </Breadcrumb>
                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> {stream?.stream_name} Stream </div>
                </StyledSectionHeading>

                <div className={'stream-container'}>
                    <VideoInput />
                    <div className={'video-details'}>
                        <StreamDescription streamType={VIDEO_TYPE.LIVE}
                                           locationName={stream?.location}
                                           source={stream?.stream_name}
                                           createdAt={stream?.created_at}
                                           ip={stream?.ip}
                        />
                        <ResultsLog />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Streams;