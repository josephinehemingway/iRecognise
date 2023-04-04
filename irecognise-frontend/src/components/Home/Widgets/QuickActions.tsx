import React, { useEffect, useState } from "react";
import { StyledLabel, StyledMediumTitle } from "../../reusable/styledText";
import {
    DownloadOutlined,
    PlusOutlined,
    UploadOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import { BorderedButton, StyledButton } from "../../reusable/button";
import { Link } from "react-router-dom";
import NewStreamModal from "../../Live/NewStreamModal";
import UploadVideoModal from "../../Uploads/UploadModal";
import { CSVLink } from "react-csv";
import {
    CSV_DATE_FORMAT,
    CSV_HEADERS,
    DATE_FORMAT,
} from "../../../utils/constants";
import moment from "moment/moment";
import { HistoryApi } from "../../../utils/interfaces";
import { Checkbox, DatePicker, Popover } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const { RangePicker } = DatePicker;

const QuickActions = () => {
    const [isStreamModalOpen, setStreamModalOpen] = useState<boolean>(false);
    const [isVideoModalOpen, setVideoModalOpen] = useState<boolean>(false);
    const [nextVideoId, setNextVideoId] = useState<number | undefined>();
    const [historyLogs, setHistoryLogs] = useState<HistoryApi[]>([]);
    const [filteredArray, setFilteredArray] = useState<HistoryApi[]>([]);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment]>([
        moment().subtract(3, "day"),
        moment(),
    ]);

    const openModal = () => {
        console.log("open modal");
    };

    const openStreamModal = () => setStreamModalOpen(true);
    const handleCloseStreamModal = () => setStreamModalOpen(false);

    const openVideoModal = () => setVideoModalOpen(true);
    const handleCloseVideoModal = () => setVideoModalOpen(false);

    // get next count
    useEffect(() => {
        fetch(`/nextcount?coll=uploads`).then((res) =>
            res.json().then((data) => {
                setNextVideoId(data);
            })
        );
    }, []);

    // fetch from api
    useEffect(() => {
        fetch(`/history`).then((res) =>
            res.json().then((data) => {
                setHistoryLogs(data);
                setFilteredArray(data);
            })
        );
    }, []);

    // filter based on date range
    useEffect(() => {
        console.log(dateRange);
        if (historyLogs.length === 0) return;

        let filteredArr: HistoryApi[];
        filteredArr = historyLogs.filter((log) => {
            if (!dateRange) return true;
            const itemDate = moment(log.timestamp, DATE_FORMAT);
            return itemDate.isBetween(
                dateRange[0],
                dateRange[1],
                "seconds",
                "[]"
            );
        });
        setFilteredArray(filteredArr);
    }, [dateRange]);

    const csvReport = {
        data: filteredArray,
        headers: CSV_HEADERS,
        filename: `Report_${moment().format(CSV_DATE_FORMAT)}.csv`,
    };

    const PopoverContent = () => {
        const handleDateChange = (date: any) => setDateRange(date);
        const handleCheckbox = (e: CheckboxChangeEvent) => {
            setShowTimePicker(e.target.checked);
        };
        return (
            <div className="datefilter">
                <div className="filter-header">
                    <StyledLabel color={"grey"} marginbottom={"0.5rem"}>
                        Filter by Timestamp:
                    </StyledLabel>
                    <Checkbox onChange={handleCheckbox}>Show Time</Checkbox>
                </div>

                <RangePicker
                    ranges={{
                        Today: [
                            moment().set({
                                hour: 0,
                                minute: 0,
                                second: 0,
                                millisecond: 0,
                            }),
                            moment(),
                        ],
                        Yesterday: [
                            moment()
                                .subtract(1, "days")
                                .set({
                                    hour: 0,
                                    minute: 0,
                                    second: 0,
                                    millisecond: 0,
                                }),
                            moment()
                                .subtract(1, "days")
                                .set({
                                    hour: 23,
                                    minute: 59,
                                    second: 59,
                                    millisecond: 999,
                                }),
                        ],
                        "Last 7 Days": [
                            moment().subtract(7, "days").set({
                                hour: 0,
                                minute: 0,
                                second: 0,
                                millisecond: 0,
                            }),
                            moment(),
                        ],
                        "This Month": [
                            moment().startOf("month"),
                            moment().endOf("month"),
                        ],
                    }}
                    style={{ width: "100%" }}
                    onChange={handleDateChange}
                    placement={"bottomLeft"}
                    showTime={showTimePicker}
                />
            </div>
        );
    };

    const DownloadPopover = () => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                }}
            >
                <PopoverContent />
                <CSVLink {...csvReport}>
                    <BorderedButton
                        top={"0.5rem"}
                        right={"0.5rem"}
                        height={"35px"}
                        width={"150px"}
                    >
                        <DownloadOutlined />
                        Download
                    </BorderedButton>
                </CSVLink>
            </div>
        );
    };

    return (
        <div className={"widgets"} draggable>
            <StyledMediumTitle marginbottom={"1rem"} fontsize={"20px"}>
                Quick Actions
            </StyledMediumTitle>
            <div className={"row"}>
                <Link to="/blacklist/new">
                    <StyledButton>
                        <PlusOutlined />
                        Add New Suspect
                    </StyledButton>
                </Link>

                <StyledButton onClick={openStreamModal}>
                    <VideoCameraAddOutlined />
                    Add New Stream
                </StyledButton>
            </div>
            <div className={"row"}>
                <StyledButton onClick={openVideoModal}>
                    <UploadOutlined />
                    Upload Video
                </StyledButton>
                <Popover
                    trigger="click"
                    placement={"bottomRight"}
                    content={DownloadPopover}
                >
                    <StyledButton onClick={openModal}>
                        <DownloadOutlined />
                        Export Report
                    </StyledButton>
                </Popover>
            </div>
            <NewStreamModal
                isModalOpen={isStreamModalOpen}
                handleClose={handleCloseStreamModal}
            />
            <UploadVideoModal
                videoId={nextVideoId}
                isModalOpen={isVideoModalOpen}
                handleClose={handleCloseVideoModal}
            />
        </div>
    );
};

export default QuickActions;
