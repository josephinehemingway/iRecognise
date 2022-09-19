import React from 'react';
// import {Button} from "antd";
import '../../App.css'
import 'antd/dist/antd.css';
import { StyledButton } from '../../assets/reusable/button';

const Home = () => {
    return (
        <div className="hello">
            HELLOOO IM HOME
            <StyledButton title="Upload">UPLOAD HERE</StyledButton>
            {/*<Button> Upload here hahahahahha</Button>*/}
        </div>
    );
};

export default Home;