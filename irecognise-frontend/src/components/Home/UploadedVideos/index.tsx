import React from 'react';
import '../styles.css'
import {StyledButton} from "../../reusable/button";
import { UploadOutlined } from '@ant-design/icons'
import LivestreamCard from "../../reusable/Cards/LivestreamCard";
import Cctv1 from "../../../assets/Images/cctv1-dummy.png";
import {StyledSectionHeading} from "../../reusable/styledText";

const UploadsSection: React.FC  = () => {
  return (
    <div className='section'>
      <StyledSectionHeading>
        <div> Uploaded Videos </div>
        <StyledButton>
          <UploadOutlined />
          Upload Video
        </StyledButton>
      </StyledSectionHeading>
      <div className='gallery'>
        <LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'} />
        {/*<LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'} />*/}
        {/*<LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'} />*/}
        {/*<LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'} />*/}
        {/*<LivestreamCard url={Cctv1} cameraName={'CCTV 1'} locationName={'NTU Arc Left Wing 1'} />*/}
      </div>
    </div>
  );
};

export default UploadsSection;