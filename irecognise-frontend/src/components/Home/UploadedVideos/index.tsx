import React, { useEffect, useState } from "react";
import "../styles.css";
import { StyledButton } from "../../reusable/button";
import { UploadOutlined } from "@ant-design/icons";
import LivestreamCard from "../../reusable/Cards/LivestreamCard";
// import Cctv1 from "../../../assets/Images/cctv1-dummy.png";
import {StyledSectionHeading, StyledText} from "../../reusable/styledText";
import {UploadsApi} from "../../../utils/interfaces";
import { Link } from "react-router-dom";
import { capitalise } from "../../../utils/helperfunctions";
import {Spin} from "antd";
import UploadVideoModal from "../UploadModal";
import {UPLOAD_S3_PREFIX} from "../../../utils/constants";

const UploadsSection: React.FC = () => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [videoList, setVideoList] = useState<UploadsApi[]>([]);
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        setLoading(true);
        fetch(`/uploads`).then((res) =>
            res.json().then((data) => {
                setVideoList(data);
            })
        );
        setLoading(false);
    }, []);

    const uploadsCardsArray = videoList.map((d) => (
        <Link to={`/uploads/${d.videoId}`} key={d.videoId}>
            <LivestreamCard
                key={d.videoId}
                url={`${UPLOAD_S3_PREFIX}${d.videoId!.toString()}/${d.video_name}.mp4`}
                cameraName={d.video_name}
                locationName={capitalise(d.location)}
            />
        </Link>
    ));

    return (
        <>
            <div className="section">
                <StyledSectionHeading marginbottom={"1.5rem"}>
                    <div> Uploaded Videos </div>
                    <StyledButton onClick={openModal}>
                        <UploadOutlined />
                        Upload Video
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
                        videoList.length > 0 ?
                            <div className='gallery'>
                                {uploadsCardsArray}
                            </div> :
                            <div style={{width: '100%'}}>
                                <StyledText color={'#ffffff80'} align={'start'} fontsize={'18px'}>
                                    No uploads found in database.
                                </StyledText>
                            </div>
                }
            </div>
            <UploadVideoModal isModalOpen={isModalOpen} handleClose={handleCloseModal}/>
        </>
);
};

export default UploadsSection;
