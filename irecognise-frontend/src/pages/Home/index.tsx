import React, {RefObject, useEffect, useRef, useState} from 'react';
import './Home.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.min.css';
import {StyledTitle, StyledSectionHeading, StyledLabel} from '../../components/reusable/styledText';
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../../components/reusable/button";
import Dashboard from "../../components/Home/Dashboard/Dashboard";
import NavDrawer from "../../components/NavDrawer/NavDrawer";
// import RecentActivitySection from "../../components/Home/RecentActivity";

const Home: React.FC = () => {
    const [width, setWidth] = useState(0);
    const observedDiv: RefObject<HTMLDivElement> = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        if (observedDiv.current) {
            resizeObserver.observe(observedDiv.current);
            console.log(observedDiv.current.offsetWidth - 76)
        }

        return function cleanup() {
            resizeObserver.disconnect();
        }
    })

    const handleElementResized = () => {
        if (observedDiv.current) {
            if (observedDiv.current.offsetWidth !== width) {
                setWidth(observedDiv.current.offsetWidth - 76);
            }
        }
    }

    const resizeObserver = new ResizeObserver(handleElementResized);


    return (
        <div className='page'>
            <div className='mainbody' ref={observedDiv}>
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledTitle>
                        Welcome back, {localStorage.getItem('firstname')}
                    </StyledTitle>
                    <StyledButton onClick={openDrawer}>
                        <EditOutlined />
                        Edit Home Page
                    </StyledButton>
                </StyledSectionHeading>
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledLabel fontsize={'16px'} align={'start'} marginbottom={'0.5rem'}>Customise your home page for a more personalised experience.</StyledLabel>
                </StyledSectionHeading>
                {/*<QuickActions />*/}

                <Dashboard dashboardWidth={width}/>
            </div>
            <NavDrawer onClose={closeDrawer} open={drawerOpen} />
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