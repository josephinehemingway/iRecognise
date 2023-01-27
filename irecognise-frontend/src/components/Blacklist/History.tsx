import React from 'react';
import './styles.css'
import type { ColumnsType } from 'antd/es/table';
import { StyledTable } from '../reusable/styledDivs';
import { HistoryTable } from '../../utils/interfaces';

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
        render: (text) => <a href='/streams'>{text}</a>,
    },
];

const data: HistoryTable[] = [
    {
        key: '1',
        timestamp: 'John Brown',
        camera: 'Camera 1',
        location: 'Home',
        similarity: '98%',
        playback: 'View Recording'
    },
]

const History: React.FC = () => {
    return (
        <div className={'history-card'}>
            <StyledTable style={{ width: '100%' }} columns={columns} dataSource={data} />
        </div>
    );
};

export default History;