import React, {useEffect, useState} from 'react';
import {StyledMediumTitle} from "../reusable/styledText";
import {DetectionInterface} from "../../utils/interfaces";
import moment from "moment/moment";
import {DATE_FORMAT} from "../../utils/constants";
import {ColumnsType} from "antd/es/table";
import {StyledTableSlim} from "../reusable/styledDivs";

type Props = {
    videoPath: string | undefined; // can be 0 for webcam, video path on local, ip address
}

const columns: ColumnsType<DetectionInterface> = [
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
    },
    {
        title: 'Identity',
        dataIndex: 'identity',
        key: 'identity',
    },
    {
        title: 'Similarity',
        dataIndex: 'similarity',
        key: 'similarity',
    },
]


const ResultsLog: React.FC<Props> = ({videoPath}) => {

    const [events, setEvents] = useState<(DetectionInterface)[]>([])
    const [newEvent, setNewEvent] = useState<DetectionInterface>()


    useEffect(() => {
        console.log(events)

        if (newEvent !== undefined) {
            setEvents([...events, newEvent])
        }

        if (events.length === 20) {
            setEvents(events.slice(-10))
        }
        console.log('length: ', events.length)

    },[newEvent])


    useEffect(() => {
        // Fetch the video stream using the Fetch API
        fetch(`/video_feed?stream=${videoPath}`)
            .then((response) => {
                console.log('fetching stream')
                console.log(response)
                // Create a new multipart response object from the fetch response
                const reader = response.body!.getReader();
                const decoder = new TextDecoder('utf-8');
                let buffer = '';
                let counter = 0;

                // Read the multipart response as chunks of data
                // @ts-ignore
                return reader.read().then(function processResult(result) {

                    if (result.done) {
                        return buffer;
                    }

                    // Append the new data to the buffer and split it into parts
                    buffer += decoder.decode(result.value, { stream: true });
                    const parts = buffer.split('\r\n');
                    // console.log(parts)

                    // Find the label in the multipart response and console log it
                    const labelPart = parts.find((part) => part.startsWith('Content-Type: text/plain'));


                    if (labelPart !== undefined) {
                        const textTypeIndex = parts.indexOf(labelPart)

                        const identity = parts[textTypeIndex + 1]
                        const similarity = parts[textTypeIndex + 2]

                        if (counter%20 == 0) {
                            console.log('identity: ', identity)
                            console.log('similarity: ', similarity)
                            console.log(counter)

                            if (identity !== 'None') {
                                setNewEvent({
                                    key: `${identity}_${moment().format(DATE_FORMAT)}_${counter}`,
                                    timestamp: moment().format(DATE_FORMAT),
                                    identity: identity,
                                    similarity: similarity
                                })
                            }
                        }

                        counter += 1;
                    }
                    // Process the next chunk of data
                    buffer = parts.pop()!;
                    return reader.read().then(processResult);
                });
            })
            .catch((error) => console.error(error));
    });

    return (
        <div className={'video-results'}>
            <StyledMediumTitle marginbottom={'0.5rem'} fontsize={'20px'}>Results Log</StyledMediumTitle>
            <div className={'results-container'}>
                <StyledTableSlim style={{ width: '100%' }} columns={columns} dataSource={events.reverse()} />
            </div>
        </div>
    );
};

export default ResultsLog;