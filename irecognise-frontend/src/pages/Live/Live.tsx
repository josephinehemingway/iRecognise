import React from 'react';
import './Live.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.min.css';
import LiveSection from "../../components/Live/Livestreams";

const Live: React.FC = () => {
    return (
        <div className='page'>
            <div className='mainbody'>
                <LiveSection/>
            </div>
        </div>
    );
};

export default Live;