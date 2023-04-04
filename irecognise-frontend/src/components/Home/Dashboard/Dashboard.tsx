import React, { Suspense, lazy } from 'react';
import GridLayout, {Layout} from "react-grid-layout";
import '../styles.css';

type Props = {
    dashboardWidth: number,
    widgets: Layout[],
}

type DashboardWidgetProps = {
    widgetId: string
}

const loadWidget = (widgetId: string) => {
    return lazy(() => import(`../Widgets/${widgetId}`));
};

const DashboardWidget: React.FC<DashboardWidgetProps> = ({widgetId}) => {
    const WidgetComponent = loadWidget(widgetId)

    return (
        <Suspense fallback={<>Loading</>}>
            <WidgetComponent />
        </Suspense>
    );
}

const Dashboard: React.FC<Props> = ({dashboardWidth, widgets}) => {

    const widgetList = widgets.map(widget => (
        <div key={widget.i}>
            <DashboardWidget widgetId={widget.i} />
        </div>
        )
    )

    return (
        <GridLayout
            className="dashboard"
            layout={widgets}
            cols={15}
            rowHeight={100}
            width={dashboardWidth}
            isBounded
            allowOverlap={false}
            margin={[10,10]}
        >
            {widgetList}
        </GridLayout>
    );
};

export default Dashboard;