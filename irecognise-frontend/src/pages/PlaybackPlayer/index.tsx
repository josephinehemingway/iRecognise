import React, {useState, useEffect} from 'react';
import {
    StyledBreadcrumbLink,
    StyledMediumTitle,
    StyledSectionHeading,
    StyledTitle
} from "../../components/reusable/styledText";
import {Breadcrumb, Spin} from "antd"
import './PlaybackPlayer.css'
import PlaybackDescription from "../../components/Playback/PlaybackDescription";
import {useLocation} from "react-router-dom";
import {HistoryApi} from "../../utils/interfaces";

const PlaybackPlayer: React.FC = () => {
    const id = useLocation().pathname.split("/")[2];
    const [record, setRecord] = useState<HistoryApi>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        fetch(`/historyrecord?id=${id}`).then((res) =>
            res.json().then((data) => {
                setRecord(data);
            })
        );
        setLoading(false);
    }, [id]);

    return (
        <div className='replay-page'>
            <div className='replay-mainbody'>
                <StyledTitle marginbottom={'0px'}>
                    Record Playback
                </StyledTitle>
                <Breadcrumb
                    separator={''}
                    style={{
                        fontFamily: 'Lato Bold',
                        fontSize: "18px",
                        marginBottom: '1rem',
                    }}>
                    <Breadcrumb.Item>
                        <StyledBreadcrumbLink  href="/playback">Playback</StyledBreadcrumbLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb'}>{record?.location}</Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb'}>{record?.camera}</Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    <Breadcrumb.Item className={'breadcrumb-end'}>{record?.timestamp}</Breadcrumb.Item>
                </Breadcrumb>

                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> Playback Stream </div>
                </StyledSectionHeading>

                <div className={'playback-container'}>
                    { record &&
                        <div className={'video-input'}>
                            <StyledMediumTitle fontsize={'20px'} marginbottom={'1rem'}>Video Snippet</StyledMediumTitle>
                            <video width='100%' height={'100%'} controls autoPlay src={record.video_url} />
                        </div>
                    }
                    {isLoading ?
                        <div style={{ width: '100%',
                            height: '50%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'}}>
                            <Spin tip="Loading..." />
                        </div> :
                        <div className={'replay-details'}>
                            <PlaybackDescription
                                camera={record?.camera}
                                locationName={record?.location}
                                timestamp={record?.timestamp}
                                similarity={record?.similarity}
                                imgUrl={record?.face_url}
                                suspectId={record?.suspectId}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PlaybackPlayer;