import React from 'react';
import { Drawer, Divider } from 'antd'
import {Layout} from "react-grid-layout";
import './drawer.css'
import QuickActions from "../Widgets/QuickActions";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Recents from "../Widgets/Recents";
import Analytics from "../Widgets/Analytics";
import {StyledMediumTitle, StyledSectionHeading, StyledLabel} from "../../reusable/styledText";
import {CloseOutlined} from "@ant-design/icons";

type Props = {
    dashboardWidth: number,
    open: boolean,
    layout: Layout[],
    setLayout: React.Dispatch<React.SetStateAction<Layout[]>>,
    //@ts-ignore
    onClose: (e: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void
}

const WidgetsDrawer: React.FC<Props> = ({ open, onClose, layout, setLayout, dashboardWidth}) => {

    const widgets = [
        { i: 'QuickActions',
            component: <QuickActions />,
            w: 4, h: 2, minH: 2, minW: 4, maxH: 4
        },
        { i: 'Recents',
            component: <Recents/>,
            w: 7, h: 3, minH: 3, minW: 7, maxH: 4
        },
        { i: 'Analytics',
            component: <Analytics/>,
            w: 4, h: 2, minH: 2, minW: 4, maxH: 4
        },
    ];

    const WidgetList = () => {
        return (
            <div >
                {widgets.map((widget, index) => (
                    <Draggable key={widget.i} draggableId={widget.i} index={index}>
                        {(provided) => (
                            <div className={'nav-item'}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                {widget.component}
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>)
    }

    function onDragEnd(result: DropResult) {
        if ( result.destination) {
            const newLayout = [...layout];
            const widgetId = result.draggableId;
            const widget = widgets.filter((w) => w.i === widgetId)[0];

            const widgetLayout = { i: widgetId,
                x: 0, y: 0, w: widget.w, h: widget.h,
                minW: widget.minW, minH: widget.minH,
                maxH: widget.maxH
            }; // Set default layout
            newLayout.push(widgetLayout); // Add the new widget to the layout
            setLayout(newLayout); // Update the layout state
        }
    }

    return (
        <Drawer placement="right"
                onClose={onClose}
                open={open}
                width={dashboardWidth + 76}
                // title={'Add Widgets'}
                closable={false}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="widgetList">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <div className={'row'} style={{marginBottom: 0}}>
                                <div className={'dropbox'} onClick={onClose}>
                                    <StyledLabel fontsize={'17px'}>
                                        Drop widgets here to add to the dashboard
                                    </StyledLabel>
                                </div>
                                <div className={'drawer'}>
                                    <StyledSectionHeading marginbottom={'0'} style={{padding: '1rem'}}>
                                        <StyledMediumTitle
                                            align={'start'} marginbottom={"0"} fontsize={"20px"}>
                                            Add Widgets
                                        </StyledMediumTitle>
                                        <CloseOutlined onClick={onClose}/>
                                    </StyledSectionHeading>
                                    <Divider style={{backgroundColor: '#fff', width: '380px'}}/>
                                    <WidgetList />
                                </div>
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </Drawer>
    );
};

export default WidgetsDrawer;