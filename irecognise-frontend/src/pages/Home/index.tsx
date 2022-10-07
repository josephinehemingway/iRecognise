import React from 'react';
import './Home.css'
import 'antd/dist/antd.css';
import {RowContainer, Container} from '../../components/reusable/styledDivs'
import LiveSection from "../../components/Home/Livestreams";

const Home = () => {
    return (
      <div className='homebody'>
          <RowContainer width={'100%'} margintop={'0px'} >
              <Container width={'75%'} bg={'rgba(40,37,58,0.75)'}>
                  <Container width={'95%'} margintop={'2rem'} marginbottom={'2rem'} >
                    <div className='hometitle'>
                      Welcome back, Josephine
                    </div>
                    <LiveSection />
                  </Container>
              </Container>
              <Container width={'25%'} bg={'rgba(69,70,75,0.55)'}>
                <Container width={'95%'}
                           margintop={'2rem'}
                           marginbottom={'2rem'}
                           marginleft={'2rem'}
                >

                </Container>
              </Container>
          </RowContainer>
      </div>

    );
};

export default Home;