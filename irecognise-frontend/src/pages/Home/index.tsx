import React, {RefObject, useEffect, useRef, useState} from 'react';
import './Home.css'
import '../../components/Home/styles.css';
import 'antd/dist/antd.min.css';
import {StyledTitle, StyledSectionHeading, StyledLabel, StyledText} from '../../components/reusable/styledText';
import {EditOutlined} from "@ant-design/icons";
import {StyledButton} from "../../components/reusable/button";
import Dashboard from "../../components/Home/Dashboard/Dashboard";
import WidgetsDrawer from "../../components/Home/WidgetsDrawer/WidgetsDrawer";
import {Layout} from "react-grid-layout";

const Home: React.FC = () => {
    const [width, setWidth] = useState(0);
    const observedDiv: RefObject<HTMLDivElement> = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    // const defaultWidgets = [
        // { i: "QuickActions", x: 13, y: 0, w: 4, h: 2, minH: 2, minW: 4}
    // ];

    const [widgets, setWidgets] = useState<Layout[]>([]);

    useEffect (() => {
        const storedWidgets = window.localStorage.getItem('WIDGET_LIST');
        if ( storedWidgets !== null ) setWidgets(JSON.parse(storedWidgets));
    }, [])

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

                {widgets.length === 0 &&
                    <div style={{width: '100%'}}>
                        <StyledText color={'#ffffff80'} fontsize={'25px'} margintop={'15rem'}>
                            You have no widgets on your home screen yet.
                            Add some widgets by clicking on 'Edit Home Page'!
                        </StyledText>
                        <StyledText color={'#ffffff80'} fontsize={'18px'} margintop={'0.5rem'}>
                            You may resize and drag them around to rearrange them!
                        </StyledText>
                    </div>
                }

                <Dashboard dashboardWidth={width} widgets={widgets}/>
                <WidgetsDrawer dashboardWidth={width} onClose={closeDrawer} open={drawerOpen} setLayout={setWidgets} layout={widgets}/>
            </div>

        </div>
    );
};

export default Home;