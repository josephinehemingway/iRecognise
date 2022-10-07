import React from 'react';
import './Home.css'
import 'antd/dist/antd.css';
import {RowContainer, Container} from '../../components/reusable/styledDivs'
import LiveSection from "../../components/Home/Livestreams";
import UploadsSection from "../../components/Home/UploadedVideos";
import RecentActivitySection from "../../components/Home/RecentActivity";

const Home = () => {
    return (
      <div className='homebody'>
          <RowContainer width={'100%'} margintop={'0px'} >
              <Container width={'75%'} bg={'rgba(40,37,58,0.75)'}>
                  <Container width={'95%'} margintop={'1rem'} marginbottom={'2rem'} padding={'1rem'}>
                    <div className='hometitle'>
                      Welcome back, Josephine
                    </div>
                    <LiveSection />
                    <UploadsSection />
                  </Container>
              </Container>
              <Container width={'25%'} bg={'rgba(69,70,75,0.50)'}>
                <Container width={'90%'}
                           margintop={'1rem'}
                           marginbottom={'2rem'}
                >
                  <RecentActivitySection />
                </Container>
              </Container>
          </RowContainer>
      </div>
    );
};

export default Home;