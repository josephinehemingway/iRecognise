import React from 'react';
import './Home.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.css';
import LiveSection from "../../components/Home/Livestreams";
import UploadsSection from "../../components/Home/UploadedVideos";
// import RecentActivitySection from "../../components/Home/RecentActivity";
import {StyledTabs} from '../../components/reusable/styledDivs'

const {TabPane} = StyledTabs

const Home: React.FC = () => {
    return (
        <div className='page'>
            <div className='mainbody'>
                <div className='hometitle'>
                    Welcome back, Josephine
                </div>

                <StyledTabs
                    size={'large'}
                    defaultActiveKey="1"
                    tabBarGutter={50}
                    tabBarStyle={{fontFamily: 'Lato Bold'}}
                >
                    <TabPane tab="Live Video Streams" key="1">
                        <LiveSection/>
                    </TabPane>
                    <TabPane tab="Uploaded Videos" key="2">
                        <UploadsSection/>
                    </TabPane>
                </StyledTabs>
            </div>

            {/*    <Container width={'25%'} bg={'rgba(69,70,75,0.50)'}>*/}
            {/*      <Container width={'90%'}*/}
            {/*                 margintop={'1rem'}*/}
            {/*                 marginbottom={'2rem'}*/}
            {/*      >*/}
            {/*        <RecentActivitySection />*/}
            {/*      </Container>*/}
            {/*    </Container>*/}
            {/*</RowContainer>*/}
        </div>
    );
};

export default Home;