import React, {useEffect, useState} from 'react';
import '../styles.css'
import {StyledButton} from "../../reusable/button";
import {PlusOutlined} from '@ant-design/icons'
import {StyledSectionHeading, StyledText} from "../../reusable/styledText";
import LivestreamCard from "../../reusable/Cards/LivestreamCard";
import Cctv1 from "../../../assets/Images/cctv1-dummy.png";
import {StreamsApi} from "../../../utils/interfaces";
import {capitalise} from "../../../utils/helperfunctions";
import {Spin} from "antd";
import {Link} from "react-router-dom";
import NewStreamModal from "../NewStreamModal";

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

    const streamCardsArray = streamList.map((d) => (
        <Link to={`/streams/${d.streamId}`} key={d.streamId} >
            <LivestreamCard
                key={d.streamId}
                url={Cctv1}
                cameraName= {d.stream_name}
                locationName={capitalise(d.location)}
            />
        </Link>
    ));

    return (
        <>
            <div className='section'>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> Live Video Streams</div>
                    <StyledButton onClick={openModal}>
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