import React, {useEffect, useState} from 'react';
import './styles.css'
import type { ColumnsType } from 'antd/es/table';
import { StyledTable } from '../reusable/styledDivs';
import {HistoryApi, HistoryTable} from '../../utils/interfaces';
import {Spin} from "antd";

const columns: ColumnsType<HistoryTable> = [
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
    },
    {
        title: 'Camera',
        dataIndex: 'camera',
        key: 'camera',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Similarity',
        dataIndex: 'similarity',
        key: 'similarity',
    },
    {
        title: 'Playback',
        dataIndex: 'playback',
        key: 'playback',
        width: '20%',
        render: (text, record) => <a href={`/replay/${record.key}`}>{text}</a>,
    },
];

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