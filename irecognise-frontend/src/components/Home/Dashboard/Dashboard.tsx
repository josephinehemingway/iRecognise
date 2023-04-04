import React from 'react';
import GridLayout from "react-grid-layout";
import QuickActions from "../Widgets/QuickActions";
import '../styles.css';

type Props = {
    dashboardWidth: number
}

const Dashboard: React.FC<Props> = ({dashboardWidth}) => {
    const defaultWidgets = [
        { i: "a", x: 0, y: 0, w: 6, h: 2 },
        { i: "b", x: 6, y: 0, w: 3, h: 1 },
        { i: "quickActions", x: 13, y: 0, w: 4, h: 2, minH: 2}
    ];

    // const [widgets, setWidgets] = useState(defaultWidgets);

    return (
        <GridLayout
            className="dashboard"
            layout={defaultWidgets}
            cols={15}
            rowHeight={100}
            width={dashboardWidth}
            isBounded
            allowOverlap={false}
            margin={[10,10]}
        >
            <div key="a" className={'widgets'}>

            </div>
            <div key="b" className={'widgets'}>

            </div>
            <div key="quickActions"><QuickActions/></div>
        </GridLayout>
    );
};

export default Dashboard;