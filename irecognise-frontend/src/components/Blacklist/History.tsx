import React, {useEffect, useState} from 'react';
import './styles.css'
import type { ColumnsType } from 'antd/es/table';
import { StyledTable } from '../reusable/styledDivs';
import {filter, HistoryApi, HistoryTable} from '../../utils/interfaces';
import {Spin} from "antd";
import moment from "moment";
import {DATE_FORMAT} from "../../utils/constants";

type Props = {
    suspectId: string
}

const History: React.FC<Props> = ({suspectId}) => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [historyLogs, setHistoryLogs] = useState<HistoryApi[]>([])

    // fetch from api
    useEffect(() => {
        setLoading(true);
        fetch(`/suspecthistory?id=${suspectId}`).then((res) =>
            res.json().then((data) => {
                setHistoryLogs(data);
            })
        );
        setLoading(false);
    }, []);

    const data: HistoryTable[] =
        historyLogs.reverse().map(({
                             _id,
                             timestamp,
                             similarity,
                             camera,
                             location}) => ({
            key: _id,
            timestamp: timestamp,
            camera: camera,
            location: location,
            similarity: similarity,
            playback: 'View Recording'
    }));

    const cameraFilter: filter[] =
        historyLogs.reverse().map((d) => {
            return (
                {
                    text: d.camera,
                    value: d.camera
                }
            )
        })

    const uniqueCameraFilter = cameraFilter.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.text === value.text && t.value === value.value
            ))
    )

    const locationFilter: filter[] =
        historyLogs.reverse().map((d) => {
            return (
                {
                    text: d.location,
                    value: d.location
                }
            )
        })

    const uniqueLocationFilter = locationFilter.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.text === value.text && t.value === value.value
            ))
    )

    const columns: ColumnsType<HistoryTable> = [
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
            defaultSortOrder: 'descend',
            sorter: (a, b) => moment(a.timestamp, DATE_FORMAT).valueOf() - moment(b.timestamp, DATE_FORMAT).valueOf(),
        },
        {
            title: 'Camera',
            dataIndex: 'camera',
            key: 'camera',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.camera.length - b.camera.length,
            filters: uniqueCameraFilter,
            //@ts-ignore
            onFilter: (value: string, record) => record.camera === value,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.location.length - b.location.length,
            filters: uniqueLocationFilter,
            //@ts-ignore
            onFilter: (value: string, record) => record.location === value,
        },
        {
            title: 'Similarity (%)',
            dataIndex: 'similarity',
            key: 'similarity',
            defaultSortOrder: 'descend',
            sorter: (a, b) => parseFloat(a.similarity) - parseFloat(b.similarity)
        },
        {
            title: 'Playback',
            dataIndex: 'playback',
            key: 'playback',
            width: '20%',
            render: (text, record) => <a href={`/replay/${record.key}`}>{text}</a>,
        },
    ];


    return (
        <div className={'history-card'}>
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
                <StyledTable style={{width: '100%'}}
                             columns={columns}
                             dataSource={data}/>
            }
        </div>
    );
};

export default History;