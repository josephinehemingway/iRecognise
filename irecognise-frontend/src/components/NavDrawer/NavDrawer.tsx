import React from 'react';
import { Drawer } from 'antd'
import './drawer.css'
import NavItem from "./NavItem";

type Props = {
    visible: boolean,
    //@ts-ignore
    onClose: (e: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void
}

const NavDrawer: React.FC<Props> = ({ visible, onClose}) => {
    return (
        <Drawer placement="left"
                onClose={onClose}
                visible={visible}
                width={'300px'}
                title={'Navigation'}
                closable={false}
        >
            <NavItem title={'Home'} linkTo={'/'}/>
            <NavItem title={'Video Streams'} linkTo={'/streams'}/>
            <NavItem title={'Video Uploads'} linkTo={'/uploads'}/>
            <NavItem title={'Blacklist Database'} linkTo={'/blacklist'}/>
        </Drawer>
    );
};

export default NavDrawer;