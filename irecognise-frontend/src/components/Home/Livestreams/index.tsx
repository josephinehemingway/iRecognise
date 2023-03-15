import React, {useEffect, useState} from 'react';
import '../styles.css'
import {StyledButton} from "../../reusable/button";
import {VideoCameraAddOutlined} from '@ant-design/icons'
import {StyledSectionHeading, StyledText} from "../../reusable/styledText";
import {StreamsApi} from "../../../utils/interfaces";
import {capitalise, checkVideoPath} from "../../../utils/helperfunctions";
import {Spin} from "antd";
import NewStreamModal from "../NewStreamModal";
import LiveCard from "../../reusable/Cards/LiveCard";
import {useNavigate} from "react-router-dom";

const LiveSection: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [streamList, setStreamList] = useState<StreamsApi[]>([])
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        setLoading(true);
        fetch(`/streams`).then((res) =>
            res.json().then((data) => {
                setStreamList(data);
            })
        );
        setLoading(false);
    }, []);

    let navigate = useNavigate()

    const streamCardsArray = streamList.map((d) => (
            <LiveCard
                onClick={() => navigate(`/streams/${d.streamId}`)}
                streamId={d.streamId!}
                key={d.streamId}
                url={`http://localhost:5000/video_feed?stream=${checkVideoPath(d.ip, d.login, d.pw)}&location=${d.location}&source=${d.stream_name}&save=True`}
                cameraName= {d.stream_name}
                locationName={capitalise(d.location)}
                active={d.active}
            />
    ));

    return (
        <>
            <div className='section'>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> Live Video Streams</div>
                    <StyledButton onClick={openModal}>
                        <VideoCameraAddOutlined />
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
                        streamList.length > 0 ?
                            <div className='gallery'>
                                {streamCardsArray}
                            </div> :
                            <div style={{width: '100%'}}>
                                <StyledText color={'#ffffff80'} align={'start'} fontsize={'18px'}>
                                    No streams found in database.
                                </StyledText>
                            </div>
                }
            </div>
            <NewStreamModal isModalOpen={isModalOpen} handleClose={handleCloseModal} />
        </>
    );
};

export default LiveSection;