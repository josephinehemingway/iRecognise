import React, { useEffect, useState } from "react";
import "../styles.css";
import { StyledButton } from "../../reusable/button";
import { UploadOutlined } from "@ant-design/icons";
import LivestreamCard from "../../reusable/Cards/LivestreamCard";
import Cctv1 from "../../../assets/Images/cctv1-dummy.png";
import { StyledSectionHeading } from "../../reusable/styledText";
import {UploadsApi} from "../../../utils/interfaces";
import { Link } from "react-router-dom";
import { capitalise } from "../../../utils/helperfunctions";
import {Spin} from "antd";

const UploadsSection: React.FC = () => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [videoList, setVideoList] = useState<UploadsApi[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch(`/uploads`).then((res) =>
            res.json().then((data) => {
                setVideoList(data);
                console.log(data);
            })
        );
        setLoading(false);
    }, []);

    const uploadsCardsArray = videoList.map((d) => (
        <Link to={`/uploads/${d._id}`}>
            <LivestreamCard
                key={d._id}
                url={Cctv1}
                cameraName={d.video_name}
                locationName={capitalise(d.location)}
            />
        </Link>
    ));

    return (
        <div className="section">
            <StyledSectionHeading marginbottom={"1.5rem"}>
                <div> Uploaded Videos </div>
                <StyledButton>
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
    );
};

export default UploadsSection;
