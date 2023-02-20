import React, { useEffect, useState } from "react";
import "../styles.css";
import { StyledButton } from "../../reusable/button";
import { UploadOutlined } from "@ant-design/icons";
import LivestreamCard from "../../reusable/Cards/LivestreamCard";
// import Cctv1 from "../../../assets/Images/cctv1-dummy.png";
import { StyledSectionHeading } from "../../reusable/styledText";
import {UploadsApi} from "../../../utils/interfaces";
import { Link } from "react-router-dom";
import { capitalise } from "../../../utils/helperfunctions";
import {Spin} from "antd";
import UploadVideoModal from "../UploadModal";

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
                url={`https://irecognise.s3-ap-southeast-1.amazonaws.com/uploads/${d.videoId!.toString()}/${d.video_name}.mp4`}
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
                    <div className='gallery'>
                        {uploadsCardsArray}
                    </div>
                }
            </div>
            <UploadVideoModal isModalOpen={isModalOpen} handleClose={handleCloseModal}/>
        </>
);
};

export default UploadsSection;
