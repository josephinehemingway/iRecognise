import React, {useEffect, useState} from 'react';
import '../styles.css'
import {StyledButton} from "../../reusable/button";
import {PlusOutlined} from '@ant-design/icons'
import {StyledSectionHeading} from "../../reusable/styledText";
import LivestreamCard from "../../reusable/Cards/LivestreamCard";
import Cctv1 from "../../../assets/Images/cctv1-dummy.png";
import {StreamsApi} from "../../../utils/interfaces";
import {capitalise} from "../../../utils/helperfunctions";
import {Spin} from "antd";
import {Link} from "react-router-dom";

const LiveSection: React.FC = () => {

    const [loading, setLoading] = useState<Boolean>(true)
    const [streamList, setStreamList] = useState<StreamsApi[]>([])

    useEffect(() => {
        setLoading(true);
        fetch(`/streams`).then((res) =>
            res.json().then((data) => {
                setStreamList(data);
                console.log(data);
            })
        );
        setLoading(false);
    }, []);

    const streamCardsArray = streamList.map((d) => (
        <Link to={`/streams/${d._id}`} >
            <LivestreamCard
                key={d._id}
                url={Cctv1}
                cameraName= {d.stream_name}
                locationName={capitalise(d.location)}
            />
        </Link>
    ));

    return (
        <div className='section'>
            <StyledSectionHeading marginbottom={'1.5rem'}>
                <div> Live Video Streams</div>
                <StyledButton>
                    <PlusOutlined/>
                    Add New Stream
                </StyledButton>
            </StyledSectionHeading>
            {loading ?
                <div style={{
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Spin tip="Loading..."/>
                </div> :
                <div className='gallery'>
                    {streamCardsArray}
                </div>
            }
        </div>
    );
};

export default LiveSection;