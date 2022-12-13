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
                    <PersonCard imgUrl={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                    <PersonCard imgUrl={'https://media-exp1.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_800_800/0/1613446958854?e=2147483647&v=beta&t=jX1dKOE-vvRQxRib2upEp9inptwNGxy9dNZhlHBapAU'}
                                id='#1'
                                name='Josephine Agatha Hemingway'
                                status={'Wanted'}/>
                </div>
            </div>
        </div>
    );
};

export default Blacklist;