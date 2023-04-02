import React, {useState, useEffect} from 'react';
import './Blacklist.css';
import {BorderedButton, StyledButton} from "../../components/reusable/button";
import {FilterOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {StyledSectionHeading, StyledTitle, StyledText, StyledLabel} from "../../components/reusable/styledText";
import {StyledInputSearch} from "../../components/reusable/styledDivs";
import PersonCard from "../../components/reusable/Cards/PersonCard";
import {capitalise} from "../../utils/helperfunctions";
import {Popover, Spin, Checkbox, Divider} from 'antd'
import {BlacklistApi} from "../../utils/interfaces";
import {Link} from "react-router-dom";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {STATUS} from "../../utils/constants";

const CheckboxGroup = Checkbox.Group;

const Blacklist = () => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [blacklist, setBlacklist] = useState<BlacklistApi[]>([])
    const [curSuspectId, setCurSuspectId] = useState<number>(0)
    const [searchTerm, updateSearchTerm] = useState('');
    const [filteredArray, setFilteredArray] = useState<BlacklistApi[]>([])
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(STATUS);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(true);

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < STATUS.length);
        setCheckAll(list.length === STATUS.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? STATUS : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const onSearch = (searchName: string) => updateSearchTerm(searchName)

    // fetch from api
    useEffect(() => {
        setLoading(true);

        var start = performance.now();

        fetch(`/blacklist`).then((res) =>
            res.json().then((data) => {
                setBlacklist(data);
                setFilteredArray(data);
            })
        );

        var end = performance.now();
        console.log(`Call to fetch /blacklist took ${end-start} milliseconds`)
        setLoading(false);
    }, []);

    // filter based on search
    useEffect(() => {
        if (blacklist.length === 0) return

        if (searchTerm === '') {
            setFilteredArray(blacklist)
        } else {
            let filteredArr: BlacklistApi[];
            filteredArr = blacklist.filter(suspect => suspect.name.toLowerCase().includes(searchTerm))
            setFilteredArray(filteredArr)
        }

    }, [searchTerm])

    // to filter based on status
    useEffect(() => {
        if (blacklist.length === 0) return
        let filteredArr: BlacklistApi[];
        filteredArr = blacklist.filter(suspect => checkedList.includes(capitalise(suspect.status)))
        setFilteredArray(filteredArr)
    }, [checkedList])

    // get next count
    useEffect(() => {
        fetch(`/nextcount?coll=blacklist`).then((res) =>
            res.json().then((data) => {
                setCurSuspectId(data);
            })
        );
    }, []);

    const blacklistCardsArray = filteredArray.map((suspect) => {
        return (
            <PersonCard
                key={suspect.suspectId!}
                id={suspect.suspectId !== undefined ? suspect.suspectId : curSuspectId}
                name={suspect.name}
                gender={suspect.gender}
                status={capitalise(suspect.status)}
            />
        )
    });

    return (
        <div className='blacklist-page'>
            <div className='blacklist-mainbody'>
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledTitle>
                        Blacklist Database
                    </StyledTitle>
                    <StyledInputSearch
                        col={"white"}
                        prefix={<SearchOutlined />} placeholder="Search suspects by name"
                        value={searchTerm === '' ? undefined : searchTerm }
                        onChange={(e: any) => onSearch(e.target.value)}/>
                </StyledSectionHeading>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> Blacklisted Persons </div>
                    <div>
                        <Link to="/blacklist/new">
                            <StyledButton>
                                <PlusOutlined/>
                                Add New Suspect
                            </StyledButton>
                        </Link>
                        <Popover content={
                            <div className="filter">
                                <StyledLabel color={'grey'} marginbottom={'0.5rem'}>
                                    Filter by Status:
                                </StyledLabel>
                                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                    Select all
                                </Checkbox>
                                <Divider orientationMargin={'10px'}/>
                                <CheckboxGroup options={STATUS} value={checkedList} onChange={onChange} />
                            </div>
                        }
                                 trigger="click"
                                 placement={'bottomRight'}>
                            <BorderedButton left={'0.5rem'} width={'50px'}>
                                <FilterOutlined/>
                            </BorderedButton>
                        </Popover>
                    </div>
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
                        filteredArray.length > 0 ?
                            <div className='blacklist-gallery'>
                                {blacklistCardsArray}
                            </div> :
                            <div style={{width: '100%'}}>
                                <StyledText color={'#ffffff80'} align={'start'} fontsize={'18px'}>
                                    No suspects found in database.
                                </StyledText>
                            </div>
                }
            </div>
        </div>
    );
};

export default Blacklist;