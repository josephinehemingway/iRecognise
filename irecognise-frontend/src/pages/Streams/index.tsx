import React from 'react';
import {StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import { Breadcrumb } from "antd"
import './Streams.css'
import {Link} from "react-router-dom";

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
                        <Link style={{ color: '#706FA9'}} to="/">Live Video Streams</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb'}>{locationName}</Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb-end'}>{streamName}</Breadcrumb.Item>
                </Breadcrumb>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> {streamName} Stream </div>
                </StyledSectionHeading>


            </div>
        </div>
    );
};

export default Streams;