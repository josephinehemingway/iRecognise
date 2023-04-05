import React, {RefObject, useEffect, useRef, useState} from 'react';
import {StyledMediumTitle, StyledLabel} from "../../reusable/styledText";
import {HistoryApi} from "../../../utils/interfaces";
import {Spin} from "antd";
import {Data} from 'plotly.js'
import Plot from 'react-plotly.js';
import moment from "moment";
import {DATE_FORMAT, SIMPLE_DATE_FORMAT} from "../../../utils/constants";

type Props = {
    inList?: boolean
}
const Analytics: React.FC<Props> = ({inList= false}) => {
    const [historyLogs, setHistoryLogs] = useState<HistoryApi[]>([])
    const [loading, setLoading] = useState<Boolean>(true)
    const observedDiv: RefObject<HTMLDivElement> = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);


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

    const detectionsByDateAndLocation = historyLogs.reduce((acc: { [key: string]: { [key: string]: number } } , curr) => {
        const date = moment(curr.timestamp, DATE_FORMAT).format(SIMPLE_DATE_FORMAT);
        const location = curr.location;

        // const date = curr.timestamp.split('/')[0] ;
        if (!acc[date]) {
            acc[date] = {};
        }
        if (!acc[date][location]) {
            acc[date][location] = 0;
        }
        acc[date][location]++;

        return acc;
    }, {});

    const startDate = moment.min(historyLogs.map((d) => moment(d.timestamp, DATE_FORMAT)));
    const endDate = moment.max(historyLogs.map((d) => moment(d.timestamp, DATE_FORMAT)));
    const endDatePlusOne = endDate.add(1, 'days')
    const dates: string[] = [];

    //@ts-ignore
    const locations = [...new Set(historyLogs.map((d) => d.location))];
    for (let d = moment(startDate); d < endDatePlusOne; d.add(1, 'days')) {
        dates.push(d.format(SIMPLE_DATE_FORMAT));
    }

    const colours = ['#72B7B2', '#E45756', '#F58518', '#BAB0AC', '#4C78A8']

    const data: Data[] = locations.map((location, index) => ({
        x: dates,
        y: dates.map((d) => {
            console.log(d)
            console.log(detectionsByDateAndLocation[d])

            if (detectionsByDateAndLocation[d]) {
                return (detectionsByDateAndLocation[d][location] || 0)
            } else {
                return 0
            }

        }),
        type: 'bar',
        marker: {color: colours[index]},
        name: location
    }));
    //
    // const data: Data[] = [{
    //     x: dates,
    //     y: counts,
    //     type: 'bar',
    //     marker: {color: '#72B7B2'}
    //
    //     y: dates.map((d) => detectionsByDateAndLocation[moment(d, SIMPLE_DATE_FORMAT).format(SIMPLE_DATE_FORMAT)][location] || 0),
    //     name: location
    // }];

    useEffect(() => {
        if (observedDiv.current) {
            resizeObserver.observe(observedDiv.current);
        }

        return function cleanup() {
            resizeObserver.disconnect();
        }
    })

    const handleElementResized = () => {
        if (observedDiv.current) {
            if (observedDiv.current.offsetWidth !== width) {
                setWidth(observedDiv.current.offsetWidth - 30);
            }

            if (!inList && observedDiv.current.offsetHeight !== height) {
                setHeight(observedDiv.current.offsetHeight - 100);
            }
        }
    }

    const resizeObserver = new ResizeObserver(handleElementResized);

    return (
        <div className={"widgets"} ref={observedDiv}>
            <StyledMediumTitle fontsize={"20px"}>
                Analytics
            </StyledMediumTitle>
            <StyledLabel >
                Number of detections in the past month
            </StyledLabel>
            <div>
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
                    <Plot
                        data={
                            data
                        }
                        layout={{
                            plot_bgcolor: '#2B305C',
                            paper_bgcolor:"#2B305C",
                            font: {
                                color: "#fff",
                            },
                            margin: {'l': 40, 'r': 20, 't': 20, 'b': 50},
                            autosize: true,
                            width: width,
                            height: inList ? 230 : height,
                            xaxis: {
                                type: 'category',
                                tickformat: '%d/%m/%Y',
                                zerolinecolor: '#fff',                            tickmode: "linear",
                                tickangle: 45,
                            },
                            yaxis: {
                                zerolinecolor: '#fff',
                            },
                            barmode: 'stack'
                        }}/>}
            </div>
        </div>
    );
};

export default Analytics;