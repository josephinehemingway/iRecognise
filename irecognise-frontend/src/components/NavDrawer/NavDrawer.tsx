import React from 'react';
import { Drawer } from 'antd'
import './drawer.css'
import NavItem from "./NavItem";

type Props = {
    open: boolean,
    //@ts-ignore
    onClose: (e: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void
}

const NavDrawer: React.FC<Props> = ({ open, onClose}) => {
    return (
        <Drawer placement="left"
                onClose={onClose}
                open={open}
                width={'300px'}
                title={'Navigation'}
                closable={false}
        >
            <NavItem title={'Home'} linkTo={'/'}/>
            <NavItem title={'Video Streams'} linkTo={'/streams'}/>
            <NavItem title={'Video Playback'} linkTo={'/uploads'}/>
            <NavItem title={'Blacklist Database'} linkTo={'/blacklist'}/>
        </Drawer>
    );
};

export default NavDrawer;