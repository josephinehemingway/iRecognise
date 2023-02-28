import React from 'react';
import {StyledBreadcrumbLink, StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import { Breadcrumb } from "antd"
import './PlaybackPlayer.css'
// import StreamDescription from "../../components/Streams/StreamDescription";
// import ResultsLog from "../../components/Streams/ResultsLog";
// import {useLocation} from "react-router-dom";
// import {UploadsApi} from "../../utils/interfaces";
// import {VIDEO_TYPE} from "../../utils/constants";
// import VideoPlayer from "../../components/Streams/VideoPlayer";

const PlaybackPlayer: React.FC = () => {
    // const id = useLocation().pathname.split("/")[2];
    // const [video, setVideo] = useState<UploadsApi>()
    //
    // useEffect(() => {
    //     fetch(`/video?id=${id}`).then((res) =>
    //         res.json().then((data) => {
    //             setVideo(data);
    //         })
    //     );
    // }, [id]);

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
                        <StyledBreadcrumbLink  href="/">Playback</StyledBreadcrumbLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    {/*<Breadcrumb.Item className={'breadcrumb'}>{video?.location}</Breadcrumb.Item>*/}
                    <Breadcrumb.Separator> <div className={'breadcrumb'}> / </div> </Breadcrumb.Separator>
                    {/*<Breadcrumb.Item className={'breadcrumb-end'}>{video?.video_name}</Breadcrumb.Item>*/}
                </Breadcrumb>
                <StyledSectionHeading marginbottom={'1rem'}>
                    <div> Playback Stream </div>
                </StyledSectionHeading>

                <div className={'video-container'}>
                    {/*{ video &&*/}
                    {/*    <VideoPlayer video={video} />*/}
                    {/*}*/}
                    {/*<div className={'upload-details'}>*/}
                    {/*    <StreamDescription*/}
                    {/*        streamType={VIDEO_TYPE.UPLOAD}*/}
                    {/*        locationName={video?.location}*/}
                    {/*        source={video?.video_name}*/}
                    {/*        date={video?.date}*/}
                    {/*        model={'VGG-Face'}*/}
                    {/*        description={video?.description}*/}
                    {/*        createdAt={video?.created_at}*/}
                    {/*    />*/}
                    {/*    <ResultsLog videoPath={video?.url_path}/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default PlaybackPlayer;