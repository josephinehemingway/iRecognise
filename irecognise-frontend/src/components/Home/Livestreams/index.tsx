import React from 'react';
import '../styles.css'
import {StyledButton} from "../../reusable/button";
import {PlusOutlined} from '@ant-design/icons'
import {StyledSectionHeading} from "../../reusable/styledText";
import LivestreamCard from "../../reusable/Cards/LivestreamCard";
import Cctv1 from "../../../assets/Images/cctv1-dummy.png";

const LiveSection: React.FC = () => {
    return (
        <div className='section'>
            <StyledSectionHeading>
                <div> Live Video Streams</div>
                <StyledButton>
                    <PlusOutlined/>
                    Add New Stream
                </StyledButton>
            </StyledSectionHeading>
            <div className='gallery'>
                <LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'}/>
                <LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'}/>
                <LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'}/>
                <LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'}/>
                <LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'}/>
            </div>

        </div>
    );
};

export default LiveSection;