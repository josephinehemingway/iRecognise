import React from 'react';
import './Blacklist.css';
import {StyledButton} from "../../components/reusable/button";
import {PlusOutlined} from "@ant-design/icons";
import {StyledSectionHeading, StyledTitle} from "../../components/reusable/styledText";
import PersonCard from "../../components/reusable/Cards/PersonCard";

const Blacklist = () => {
    return (
        <div className='blacklist-page'>
            <div className='blacklist-mainbody'>
                <StyledTitle>
                    Blacklist Database
                </StyledTitle>
                <StyledSectionHeading marginbottom={'1.5rem'}>
                    <div> Blacklisted Persons </div>
                    <StyledButton>
                        <PlusOutlined/>
                        Add New Suspect
                    </StyledButton>
                </StyledSectionHeading>

                <div className='blacklist-gallery'>
                    <PersonCard imgUrl={'https://yt3.ggpht.com/ytc/AMLnZu9SQXWA4keCQRGQC6Y7ywVpj1ou1um_3jPHgsCxAQ=s900-c-k-c0x00ffffff-no-rj'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://yt3.ggpht.com/ytc/AMLnZu9SQXWA4keCQRGQC6Y7ywVpj1ou1um_3jPHgsCxAQ=s900-c-k-c0x00ffffff-no-rj'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://yt3.ggpht.com/ytc/AMLnZu9SQXWA4keCQRGQC6Y7ywVpj1ou1um_3jPHgsCxAQ=s900-c-k-c0x00ffffff-no-rj'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://yt3.ggpht.com/ytc/AMLnZu9SQXWA4keCQRGQC6Y7ywVpj1ou1um_3jPHgsCxAQ=s900-c-k-c0x00ffffff-no-rj'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://yt3.ggpht.com/ytc/AMLnZu9SQXWA4keCQRGQC6Y7ywVpj1ou1um_3jPHgsCxAQ=s900-c-k-c0x00ffffff-no-rj'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://yt3.ggpht.com/ytc/AMLnZu9SQXWA4keCQRGQC6Y7ywVpj1ou1um_3jPHgsCxAQ=s900-c-k-c0x00ffffff-no-rj'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                </div>
            </div>
        </div>
    );
};

export default Blacklist;