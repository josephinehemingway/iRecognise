import React, {useEffect, useState} from 'react';
import './Playback.css'
import {StyledText, StyledTitle, StyledLabel, StyledSectionHeading} from "../../components/reusable/styledText";
import PlaybackCard from "../../components/reusable/Cards/PlaybackCard";
import blankProfile from "../../assets/Images/blank-profile.png";
import {Link} from "react-router-dom";
import {HistoryApi} from "../../utils/interfaces";
import {Checkbox, Popover, Spin} from "antd";
import { DatePicker } from 'antd';
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import {BorderedButton} from "../../components/reusable/button";
import {StyledInputSearch} from "../../components/reusable/styledDivs";
import moment from 'moment'
import {DATE_FORMAT} from "../../utils/constants";
import {CheckboxChangeEvent} from "antd/es/checkbox";

const {RangePicker} = DatePicker;


const Playback = () => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [historyLogs, setHistoryLogs] = useState<HistoryApi[]>([])
    const [searchTerm, updateSearchTerm] = useState('');
    const [filteredArray, setFilteredArray] = useState<HistoryApi[]>([])
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false)
    const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment]>([
        moment().subtract(3, 'day'),
        moment(),
    ])

    const onSearch = (searchName: string) => updateSearchTerm(searchName)
    const handleDateChange = (date: any) => setDateRange(date)
    const handleCheckbox = (e: CheckboxChangeEvent) => {
        setShowTimePicker(e.target.checked);
    }

    // filter based on date range
    useEffect(() => {
        console.log(dateRange)
        if (historyLogs.length === 0) return

        let filteredArr: HistoryApi[];
        filteredArr = historyLogs.filter((log) =>{
            if (!dateRange) return true
            const itemDate = moment(log.timestamp, DATE_FORMAT);
            return itemDate.isBetween(dateRange[0], dateRange[1], 'seconds', '[]');
            }
        )
        setFilteredArray(filteredArr)

    },[dateRange])

    // filter based on search
    useEffect(() => {
        if (historyLogs.length === 0) return
        if (searchTerm === '') {
            setFilteredArray(historyLogs)
        } else {
            let filteredArr: HistoryApi[];
            filteredArr = historyLogs.filter(log =>
                log.location.toLowerCase().includes(searchTerm) ||
                log.camera.toLowerCase().includes(searchTerm)
            )
            setFilteredArray(filteredArr)
        }

    }, [searchTerm])

    // fetch from api
    useEffect(() => {
        setLoading(true);
        fetch(`/history`).then((res) =>
            res.json().then((data) => {
                setHistoryLogs(data);
                setFilteredArray(data)
            })
        );
        setLoading(false);
    }, []);

    const historyLogsArray = filteredArray.map((history) => {
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
                <StyledSectionHeading>
                    <StyledTitle>
                        Playback Records
                    </StyledTitle>
                    <StyledInputSearch
                        col={"white"}
                        prefix={<SearchOutlined />} placeholder="Search history by location or camera name"
                        value={searchTerm === '' ? undefined : searchTerm }
                        onChange={(e: any) => onSearch(e.target.value)}/>
                    <Popover
                        trigger="click"
                        placement={'bottomRight'}
                        content={
                        <div className="datefilter">
                            <div className='filter-header'>
                                <StyledLabel color={'grey'} marginbottom={'0.5rem'}>
                                    Filter by Timestamp:
                                </StyledLabel>
                                <Checkbox onChange={handleCheckbox}>Show Time</Checkbox>
                            </div>

                            <RangePicker
                                style={{ width: '100%' }}
                                onChange={handleDateChange}
                                placement={'bottomLeft'}
                                showTime={showTimePicker}/>
                        </div>
                    }   >
                        <BorderedButton left={'0.5rem'} width={'50px'}>
                            <FilterOutlined/>
                        </BorderedButton>
                    </Popover>
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