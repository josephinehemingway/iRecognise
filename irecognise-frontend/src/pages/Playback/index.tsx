import React from 'react';
import './Playback.css'
import {StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import PlaybackCard from "../../components/reusable/Cards/PlaybackCard";
import blankProfile from "../../assets/Images/blank-profile.png";
import {DATE_FORMAT} from "../../utils/constants";
import moment from "moment";
import {Link} from "react-router-dom";
import {StyledButton} from "../../components/reusable/button";
import {FilterOutlined} from "@ant-design/icons";

const Playback = () => {
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
                <div className='playback-gallery'>
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                    <PlaybackCard url={blankProfile}
                                  id={3}
                                  identity={'Josephine Hemingway'}
                                  cameraName={'Webcam'}
                                  locationName={'Home'}
                                  timestamp={moment().format(DATE_FORMAT)} />
                </div>

            </div>
        </div>
    );
};

export default Playback;