import React, {Suspense, lazy, useState, useEffect} from 'react';
import GridLayout, {Layout} from "react-grid-layout";
import '../styles.css';
import {StreamsApi} from "../../../utils/interfaces";
import Feed from "../Widgets/Feed";

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


// @ts-ignore
const DashboardWidget: React.FC<DashboardWidgetProps> = ({widgetId}) => {
    const [streamList, setStreamList] = useState<StreamsApi[]>([])

    useEffect(() => {
        fetch(`/streams`).then((res) =>
            res.json().then((data) => {
                setStreamList(data);
            })
        );
    }, []);

    if (widgetId.startsWith('Feed')) {
        const streamIndex = parseInt(widgetId.split('/')[1]);

        if (streamList[streamIndex]) {
            return <Feed stream={streamList[streamIndex]}/>
        }
    } else {
        const WidgetComponent = loadWidget(widgetId)

        return (
            <Suspense fallback={<>Loading</>}>
                <WidgetComponent/>
            </Suspense>
        );
    }
}

const Dashboard: React.FC<Props> = ({dashboardWidth, widgets}) => {
    // const [widgetLayout, setWidgetLayout] = useState<Layout[]>(widgets)
    //
    // const onLayoutChange = useCallback(
    //     (layout: Layout[]) => {
    //         setWidgetLayout(layout);
    //         // localStorage.setItem("WIDGET_LAYOUT", JSON.stringify(layout));
    //
    //         const widgetSizes: { [key: string]: { minW: number, minH: number } } = {};
    //         layout.forEach((item) => {
    //             const widgetId = item.i;
    //             const widget = widgets.find((widget) => widget.i === widgetId);
    //             if (widget) {
    //                 widgetSizes[widgetId] = { minW: widget.minW!, minH: widget.minH! };
    //             }
    //         });
    //         global.localStorage.setItem("WIDGET_SIZES", JSON.stringify(widgetSizes));
    //     },
    //     [widgets]
    // );
    //
    // useEffect(() => {
    //     console.log( JSON.stringify(widgetLayout))
    //     global.localStorage.setItem("WIDGET_LAYOUT", JSON.stringify(widgetLayout));
    // }, [widgetLayout]);
    //
    // useEffect (() => {
    //     const storedLayout = global.localStorage.getItem('WIDGET_LAYOUT');
    //     console.log(storedLayout)
    //
    //     if ( storedLayout !== null ) {
    //         setWidgetLayout(JSON.parse(storedLayout));
    //     }
    //
    // }, [])

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
            rowHeight={90}
            width={dashboardWidth}
            isBounded
            allowOverlap={false}
            margin={[10,10]}
            // onLayoutChange={onLayoutChange}
        >
            {widgetList}
        </GridLayout>
    );
};

export default Dashboard;