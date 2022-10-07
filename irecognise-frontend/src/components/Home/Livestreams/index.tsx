import React from 'react';
import '../styles.css'
import {StyledButton} from "../../reusable/button";
import { PlusOutlined } from '@ant-design/icons'

const LiveSection = () => {
  return (
    <div className='section'>
      <div className = 'heading1'>
        <div> Live Video Streams </div>
        <StyledButton>
          <PlusOutlined />
          Add New Stream
        </StyledButton>
      </div>
    </div>
  );
};

export default LiveSection;