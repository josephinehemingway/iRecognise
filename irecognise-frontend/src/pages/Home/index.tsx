import React from 'react';
import './Home.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.min.css';
import LiveSection from "../../components/Home/Livestreams";
import UploadsSection from "../../components/Home/UploadedVideos";
import { StyledTabs} from '../../components/reusable/styledDivs'
// import RecentActivitySection from "../../components/Home/RecentActivity";
import { StyledTitle } from '../../components/reusable/styledText';

const Home: React.FC = () => {

    return (
        <div className='page'>
            <div className='mainbody'>
                <StyledTitle>
                    Welcome back, {localStorage.getItem('firstname')}
                </StyledTitle>
                <StyledTabs
                    size={'large'}
                    // defaultActiveKey="1"
                    tabBarGutter={50}
                    tabBarStyle={{fontFamily: 'Lato Bold'}}
                    items={[
                        {
                            label: "Live Video Streams",
                            key: '1',
                            children: <LiveSection/>
                        },
                        {
                            label: "Uploaded Videos",
                            key: '2',
                            children: <UploadsSection/>
                        },

                    ]}
                />
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