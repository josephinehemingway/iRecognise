import React, {useEffect, useState} from 'react';
import '../../Home/styles.css'
import {StyledButton} from "../../reusable/button";
import {SearchOutlined, VideoCameraAddOutlined} from '@ant-design/icons'
import {StyledSectionHeading, StyledText, StyledTitle} from "../../reusable/styledText";
import {StreamsApi} from "../../../utils/interfaces";
import {capitalise, checkVideoPath} from "../../../utils/helperfunctions";
import {Spin} from "antd";
import NewStreamModal from "../NewStreamModal";
import LiveCard from "../../reusable/Cards/LiveCard";
import {useNavigate} from "react-router-dom";
import {StyledInputSearch} from "../../reusable/styledDivs";

const LiveSection: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [streamList, setStreamList] = useState<StreamsApi[]>([])
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [searchTerm, updateSearchTerm] = useState('');
    const [filteredArray, setFilteredArray] = useState<StreamsApi[]>([])

    const openModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        setLoading(true);

        var start = performance.now();

        fetch(`/streams`).then((res) =>
            res.json().then((data) => {
                setStreamList(data);
                setFilteredArray(data);
            })
        );

        var end = performance.now();
        console.log(`Call to fetch /streams took ${end-start} milliseconds`)

        setLoading(false);
    }, []);

    let navigate = useNavigate()

    const onSearch = (searchName: string) => updateSearchTerm(searchName)

    // filter based on search
    useEffect(() => {
        if (streamList.length === 0) return

        if (searchTerm === '') {
            setFilteredArray(streamList)
        } else {
            let filteredArr: StreamsApi[];
            filteredArr = streamList.filter(s => s.stream_name.toLowerCase().includes(searchTerm))
            setFilteredArray(filteredArr)
        }

    }, [searchTerm])

    const streamCardsArray = filteredArray.map((d) => (
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
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledTitle>
                        Live Surveillance Feed
                    </StyledTitle>
                    <StyledInputSearch
                        col={"white"}
                        prefix={<SearchOutlined />} placeholder="Search streams by name"
                        value={searchTerm === '' ? undefined : searchTerm }
                        onChange={(e: any) => onSearch(e.target.value)}
                    />
                </StyledSectionHeading>
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