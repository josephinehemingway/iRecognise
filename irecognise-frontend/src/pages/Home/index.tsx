import React from 'react';
import './Home.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.min.css';
import LiveSection from "../../components/Home/Livestreams";
import { StyledTitle } from '../../components/reusable/styledText';
// import RecentActivitySection from "../../components/Home/RecentActivity";
// import {Container} from "../../components/reusable/styledDivs";

const Home: React.FC = () => {

    return (
        <div className='page'>
            <div className='mainbody'>
                <StyledTitle>
                    Welcome back, {localStorage.getItem('firstname')}
                </StyledTitle>
                <LiveSection/>
            </div>

            {/*<Container width={'25%'} bg={'rgba(69,70,75,0.50)'}>*/}
            {/*  <Container width={'90%'}*/}
            {/*             margintop={'1rem'}*/}
            {/*             marginbottom={'2rem'}*/}
            {/*  >*/}
            {/*    <RecentActivitySection />*/}
            {/*  </Container>*/}
            {/*</Container>*/}
        </div>
    );
};

export default Home;