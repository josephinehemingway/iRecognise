import React from 'react';
import { Drawer } from 'antd'
import './drawer.css'
import NavItem from "./NavItem";
import {StyledLink} from "../reusable/styledText";
import {LogoutOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

type Props = {
    open: boolean,
    //@ts-ignore
    onClose: (e: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void
}

const NavDrawer: React.FC<Props> = ({ open, onClose}) => {
    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <Drawer placement="right"
                onClose={onClose}
                open={open}
                width={'300px'}
                title={'Navigation'}
                closable={false}
        >
            <NavItem title={'Home'} linkTo={'/home'}/>

            <div className={'nav-item'}>
                <Link to={'/login'}>
                    <StyledLink
                        fontsize={'18px'}
                        color={'#b7b4ff'}
                        hovercolor={'rgba(255,255,255,0.82)'}
                        onClick={handleLogout}>
                        <LogoutOutlined style={{marginRight: '0.5rem'}}/>
                        Sign out
                    </StyledLink>
                </Link>
            </div>
        </Drawer>
    );
};

export default NavDrawer;