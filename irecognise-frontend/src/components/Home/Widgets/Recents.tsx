import React, {useEffect, useState} from 'react';
import {StyledMediumTitle} from "../../reusable/styledText";
import {HistoryApi, HistoryTable} from "../../../utils/interfaces";
import {ColumnsType} from "antd/es/table";
import {Spin} from "antd";
import {StyledTable} from "../../reusable/styledDivs";

const columns: ColumnsType<HistoryTable> = [
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
    },
    {
        title: 'Suspect',
        dataIndex: 'suspectId',
        key: 'suspectId',
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
        title: '%',
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
    inList?: boolean
}

const Recents: React.FC<Props> = ({inList= false}) => {
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

    const data: HistoryTable[] =
        historyLogs.reverse().map(({
                                       _id,
                                       timestamp,
                                       similarity,
                                       suspectId,
                                       camera,
                                       location}) => ({
            key: _id,
            timestamp: timestamp,
            suspectId: suspectId,
            camera: camera,
            location: location,
            similarity: similarity,
            playback: 'View Recording'
        }));

    return (
        <div className={'widgets'}>
            <StyledMediumTitle fontsize={"20px"}>
                Recents
            </StyledMediumTitle>
            <div className={'history-table'} style={{overflow: inList ? 'hidden' : 'scroll'}}>
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
        </div>
    );
};

export default Recents;