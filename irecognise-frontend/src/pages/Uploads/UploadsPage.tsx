import React, {useState, useEffect} from 'react';
import './Uploads.css';
import {StyledButton} from "../../components/reusable/button";
import {SearchOutlined, UploadOutlined} from "@ant-design/icons";
import {StyledSectionHeading, StyledTitle, StyledText} from "../../components/reusable/styledText";
import {StyledInputSearch} from "../../components/reusable/styledDivs";
import {capitalise} from "../../utils/helperfunctions";
import {Spin} from 'antd'
import {UploadsApi} from "../../utils/interfaces";
import {Link} from "react-router-dom";
import {UPLOAD_S3_PREFIX} from "../../utils/constants";
import UploadsCard from "../../components/reusable/Cards/UploadsCard";
import UploadVideoModal from "../../components/Uploads/UploadModal";


const UploadsPage = () => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [nextVideoId, setNextVideoId] = useState<number | undefined>()
    const [searchTerm, updateSearchTerm] = useState('');
    const [filteredArray, setFilteredArray] = useState<UploadsApi[]>([])
    const [videoList, setVideoList] = useState<UploadsApi[]>([]);
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const onSearch = (searchName: string) => updateSearchTerm(searchName)

    const openModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        setLoading(true);

        var start = performance.now();

        fetch(`/uploads`).then((res) =>
            res.json().then((data) => {
                setVideoList(data);
                setFilteredArray(data);
                console.log(data)
            })
        );

        var end = performance.now();
        console.log(`Call to fetch /uploads took ${end-start} milliseconds`)

        setLoading(false);
    }, []);

    const uploadsCardsArray = filteredArray.map((d) => (
        <Link to={`/uploads/${d.videoId}`} key={d.videoId}>
            <UploadsCard
                key={d.videoId}
                url={`${UPLOAD_S3_PREFIX}${d.videoId!.toString()}/${d.video_name}.mp4`}
                cameraName={d.video_name}
                locationName={capitalise(d.location)}
            />
        </Link>
    ));

    // filter based on search
    useEffect(() => {
        if (videoList.length === 0) return

        if (searchTerm === '') {
            setFilteredArray(videoList)
        } else {
            let filteredArr: UploadsApi[];
            filteredArr = videoList.filter(v => v.video_name.toLowerCase().includes(searchTerm))
            setFilteredArray(filteredArr)
        }
    }, [searchTerm])


    // get next count
    useEffect(() => {
        fetch(`/nextcount?coll=uploads`).then((res) =>
            res.json().then((data) => {
                setNextVideoId(data);
            })
        );
    }, []);

    return (
        <div className='uploads-page-container'>
            <div className='uploads-page-mainbody'>
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledTitle>
                        Uploads
                    </StyledTitle>
                    <StyledInputSearch
                        col={"white"}
                        prefix={<SearchOutlined />} placeholder="Search uploads by video name"
                        value={searchTerm === '' ? undefined : searchTerm }
                        onChange={(e: any) => onSearch(e.target.value)}/>
                </StyledSectionHeading>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> Uploaded Videos </div>
                    <StyledButton onClick={openModal}>
                        <UploadOutlined />
                        Upload Video
                    </StyledButton>
                </StyledSectionHeading>
                {loading ?
                    <div style={{ width: '100%',
                        height: '50%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <Spin tip="Loading..." />
                    </div> :
                    filteredArray.length > 0 ?
                        <div className='upload-gallery'>
                            {uploadsCardsArray}
                        </div> :
                        <div style={{width: '100%'}}>
                            <StyledText color={'#ffffff80'} align={'start'} fontsize={'18px'}>
                                No uploads found in database.
                            </StyledText>
                        </div>
                }
            </div>
            <UploadVideoModal videoId={nextVideoId} isModalOpen={isModalOpen} handleClose={handleCloseModal}/>
        </div>
    );
};

export default UploadsPage;