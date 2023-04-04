import React from "react";
import { Nav, NavLink, NavBtn, NavWrapper, MenuText } from "./NavbarComponents";
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Popover } from "antd";
import {StyledMediumTitle} from "../reusable/styledText";
import './navbar.css'
import Profile from "./Profile";

type Props = {
    collapsed: boolean,
    handleClick: React.MouseEventHandler,
}

const Navbar: React.FC<Props>  = ({ collapsed, handleClick}) => {
    return (
        <Nav>
            <NavWrapper>
                <NavBtn onClick={handleClick}>
                    {collapsed ?
                        <MenuUnfoldOutlined style={{ fontSize: 20, color: "#fff" }} /> :
                        <MenuFoldOutlined style={{ fontSize: 20, color: "#fff" }} />
                    }
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
                <NavBtn>
                    <BellOutlined style={{ fontSize: 22, color: "#fff" }} />
                </NavBtn>
            </NavWrapper>
        </Nav>
    );
};

export default Navbar;
