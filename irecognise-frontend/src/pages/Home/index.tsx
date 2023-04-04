import React from 'react';
import './Home.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.min.css';
import {StyledTitle, StyledSectionHeading, StyledLabel} from '../../components/reusable/styledText';
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../../components/reusable/button";
import QuickActions from "../../components/Home/Widgets/QuickActions";
// import RecentActivitySection from "../../components/Home/RecentActivity";
// import {Container} from "../../components/reusable/styledDivs";

const Home: React.FC = () => {

    return (
        <div className='page'>
            <div className='mainbody'>
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledTitle>
                        Welcome back, {localStorage.getItem('firstname')}
                    </StyledTitle>
                    <StyledButton>
                        <EditOutlined />
                        Edit Home Page
                    </StyledButton>
                </StyledSectionHeading>
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledLabel fontsize={'16px'} align={'start'} >Customise your home page for a more personalised experience.</StyledLabel>
                </StyledSectionHeading>
                <QuickActions />
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