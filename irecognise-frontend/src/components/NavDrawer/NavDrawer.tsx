import React from 'react';
import { Drawer } from 'antd'
import './drawer.css'

type Props = {
    open: boolean,
    //@ts-ignore
    onClose: (e: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void
}

const NavDrawer: React.FC<Props> = ({ open, onClose}) => {

    return (
        <Drawer placement="right"
                onClose={onClose}
                open={open}
                width={'300px'}
                title={'Add Widgets'}
                closable={false}
        >
            <div className={'nav-item'}>

            </div>
        </Drawer>
    );
};

export default NavDrawer;