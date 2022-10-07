import React from 'react';
import '../styles.css'
import {StyledButton} from "../../reusable/button";
import { UploadOutlined } from '@ant-design/icons'

const UploadsSection = () => {
  return (
    <div className='section'>
      <div className = 'heading1'>
        <div> Uploaded Videos </div>
        <StyledButton>
          <UploadOutlined />
          Upload Video
        </StyledButton>
      </div>
    </div>
  );
};

export default UploadsSection;