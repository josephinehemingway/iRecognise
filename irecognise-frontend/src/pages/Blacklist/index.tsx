import React, {useState, useEffect} from 'react';
import './Blacklist.css';
import {StyledButton} from "../../components/reusable/button";
import {PlusOutlined} from "@ant-design/icons";
import {StyledSectionHeading, StyledTitle, StyledText} from "../../components/reusable/styledText";
import PersonCard from "../../components/reusable/Cards/PersonCard";
import {capitalise} from "../../utils/helperfunctions";
import {Spin} from 'antd'
import {BlacklistApi} from "../../utils/interfaces";
import {Link} from "react-router-dom";

const Blacklist = () => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [blacklist, setBlacklist] = useState<BlacklistApi[]>([])
    const [curSuspectId, setCurSuspectId] = useState<number>(0)

    useEffect(() => {
        setLoading(true);
        fetch(`/blacklist`).then((res) =>
            res.json().then((data) => {
                setBlacklist(data);
            })
        );
        setLoading(false);
    }, []);

    useEffect(() => {
        fetch(`/nextcount?coll=blacklist`).then((res) =>
            res.json().then((data) => {
                setCurSuspectId(data);
            })
        );
    }, []);

    const blacklistCardsArray = blacklist.map((d) => (
        <PersonCard
            key={d.suspectId!}
            id= {d.suspectId !== undefined ? d.suspectId : curSuspectId}
            imgUrl={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'}
            name= {d.name}
            status={capitalise(d.status)}
        />
    ));

    return (
        <div className='blacklist-page'>
            <div className='blacklist-mainbody'>
                <StyledTitle>
                    Blacklist Database
                </StyledTitle>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> Blacklisted Persons </div>
                    <Link to="/blacklist/new">
                        <StyledButton>
                            <PlusOutlined/>
                            Add New Suspect
                        </StyledButton>
                    </Link>
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
                        blacklist.length > 0 ?
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