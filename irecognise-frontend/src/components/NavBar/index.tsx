import React, {useState} from "react";
import { Nav, NavLink, NavBtn, NavWrapper, MenuText } from "./NavbarComponents";
import { MenuOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Popover } from "antd";
import NavDrawer from "../NavDrawer/NavDrawer";
import {StyledMediumTitle} from "../reusable/styledText";
import './navbar.css'
import Profile from "./Profile";

const Navbar: React.FC  = () => {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <Nav>
            <NavWrapper>
                <NavBtn onClick={openDrawer}>
                    <MenuOutlined style={{ fontSize: 20, color: "#fff" }} />
                </NavBtn>
                <NavLink to="/home">
                    <StyledMediumTitle fontsize={'16px'}>
                        iRecognise
                    </StyledMediumTitle>
                </NavLink>
            </NavWrapper>
            <NavWrapper>
                <NavLink>
                    <Popover content={<Profile/>}
                             trigger="click"
                             placement={'bottomRight'}>
                        <div className={'user'}>
                            <MenuText> { localStorage.getItem('username')} </MenuText>
                            <Avatar src="https://media-exp2.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_200_200/0/1613446958854?e=2147483647&v=beta&t=kY4PSyTgrK9yIRccPY0oJa-yVxKJhGQePoWWxtH12OQ" />
                        </div>
                    </Popover>
                </NavLink>
                <NavBtn onClick={openDrawer}>
                    <BellOutlined style={{ fontSize: 22, color: "#fff" }} />
                </NavBtn>
            </NavWrapper>
            <NavDrawer onClose={closeDrawer} open={drawerOpen} />
        </Nav>
    );
};

export default Navbar;
