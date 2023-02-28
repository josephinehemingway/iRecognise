import React, {useEffect, useState} from 'react';
import './Playback.css'
import {StyledSectionHeading, StyledText, StyledTitle} from "../../components/reusable/styledText";
import PlaybackCard from "../../components/reusable/Cards/PlaybackCard";
import blankProfile from "../../assets/Images/blank-profile.png";
import {Link} from "react-router-dom";
import {StyledButton} from "../../components/reusable/button";
import {FilterOutlined} from "@ant-design/icons";
import {HistoryApi} from "../../utils/interfaces";
import {Spin} from "antd";

const Playback = () => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [historyLogs, setHistoryLogs] = useState<HistoryApi[]>([])

    // fetch from api
    useEffect(() => {
        setLoading(true);
        fetch(`/history`).then((res) =>
            res.json().then((data) => {
                setHistoryLogs(data);
            })
        );
        setLoading(false);
    }, []);

    const historyLogsArray = historyLogs.map((history) => {
        return (
            <Link to={`/replay/${history._id}`} key={history._id} >
                <PlaybackCard
                    key={`${history.suspectId}_${history.similarity}_${history.timestamp}`}
                    url={blankProfile}
                              id={history.suspectId}
                              similarity={history.similarity}
                              cameraName={history.camera}
                              locationName={history.location}
                              timestamp={history.timestamp} />
            </Link>
        )
    });

    return (
        <div className={'playback-page'}>
            <div className='playback-mainbody'>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <StyledTitle>
                        Playback Records
                    </StyledTitle>
                    <Link to="/blacklist/new">
                        <StyledButton>
                            <FilterOutlined/>
                            Filter Dates
                        </StyledButton>
                    </Link>
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
                    historyLogsArray.length > 0 ?
                        <div className='playback-gallery'>
                            {historyLogsArray}
                        </div> :
                        <div style={{width: '100%'}}>
                            <StyledText color={'#ffffff80'} align={'start'} fontsize={'18px'}>
                                No logs found in database.
                            </StyledText>
                        </div>
                }
            </div>
        </div>
    );
};

export default Playback;