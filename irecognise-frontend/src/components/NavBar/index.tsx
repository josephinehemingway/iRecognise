import React from "react";
import {
  Nav,
  NavLink,
  NavBtn,
  NavWrapper,
  MenuText,
} from "./NavbarComponents";
import { MenuOutlined } from '@ant-design/icons'
import { Avatar } from "antd";

const Navbar = () => {
  return (
    <Nav>
      <NavWrapper>
        <NavBtn>
          <MenuOutlined style={{fontSize: 20, color: '#fff'}}/>
        </NavBtn>
      </NavWrapper>
      <NavWrapper>
        <NavLink to="/">
          <MenuText> josephinehemingway </MenuText>
        </NavLink>
        <NavBtn>
          <Avatar src="https://media-exp2.licdn.com/dms/image/C5603AQHBddL2xeTvnQ/profile-displayphoto-shrink_200_200/0/1613446958854?e=2147483647&v=beta&t=kY4PSyTgrK9yIRccPY0oJa-yVxKJhGQePoWWxtH12OQ" />
        </NavBtn>
      </NavWrapper>
    </Nav>
  );
};

export default Navbar;
