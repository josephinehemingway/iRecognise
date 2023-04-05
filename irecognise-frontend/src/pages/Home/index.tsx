import React, {RefObject, useEffect, useRef, useState} from 'react';
import './Home.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.min.css';
import {StyledTitle, StyledSectionHeading, StyledLabel} from '../../components/reusable/styledText';
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../../components/reusable/button";
import Dashboard from "../../components/Home/Dashboard/Dashboard";
import WidgetsDrawer from "../../components/Home/WidgetsDrawer/WidgetsDrawer";
import {Layout} from "react-grid-layout";
// import RecentActivitySection from "../../components/Home/RecentActivity";

const Home: React.FC = () => {
    const [width, setWidth] = useState(0);
    const observedDiv: RefObject<HTMLDivElement> = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const defaultWidgets = [
        { i: "QuickActions", x: 13, y: 0, w: 4, h: 2, minH: 2, minW: 4}
    ];

    const [widgets, setWidgets] = useState<Layout[]>(defaultWidgets);

    useEffect (() => {
        const storedWidgets = window.localStorage.getItem('WIDGET_LIST');
        console.log(storedWidgets)
        if ( storedWidgets !== null ) setWidgets(JSON.parse(storedWidgets));
    }, [])

    useEffect (() => {
        console.log(widgets)
    }, [widgets])

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    useEffect(() => {
        if (observedDiv.current) {
            resizeObserver.observe(observedDiv.current);
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
                <StyledTitle>
                    Welcome back, {localStorage.getItem('firstname')}
                </StyledTitle>
                <StyledSectionHeading marginbottom={'0'}>
                    <div> Dashboard </div>
                    <StyledButton onClick={openDrawer}>
                        <EditOutlined />
                        Edit Home Page
                    </StyledButton>
                </StyledSectionHeading>
                <StyledSectionHeading marginbottom={'0'}>
                    <StyledLabel fontsize={'16px'} align={'start'} marginbottom={'0.5rem'}>Customise your home page for a more personalised experience.</StyledLabel>
                </StyledSectionHeading>

                <Dashboard dashboardWidth={width} widgets={widgets}/>
                <WidgetsDrawer dashboardWidth={width} onClose={closeDrawer} open={drawerOpen} setLayout={setWidgets} layout={widgets}/>
            </div>

        </div>
    );
};

export default Home;