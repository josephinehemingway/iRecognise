import React from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import { Breadcrumb } from "antd"
import './Streams.css'
// import {Link} from "react-router-dom";
import StreamDescription from "../../components/Streams/StreamDescription";

type Props = {
    streamName: string;
    locationName: string;
}

const Streams: React.FC<Props> = ({streamName, locationName}) => {
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
                    <Breadcrumb.Item className={'breadcrumb'}>{locationName}</Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb-end'}>{streamName}</Breadcrumb.Item>
                </Breadcrumb>
                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> {streamName} Stream </div>
                </StyledSectionHeading>

                <div className={'stream-container'}>
                    <div className={'video-input'}>
                        Stream
                    </div>
                    <div className={'video-details'}>
                        <StreamDescription locationName={locationName}/>
                        <div className={'video-results'}>
                            Results Log
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Streams;