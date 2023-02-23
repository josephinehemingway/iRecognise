// @ts-ignore
import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const Nav = styled.nav`
  background: #1e2238;
  opacity: 95%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  z-index: 10;
`;

// wrapper to align items to the right most
export const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
`

// button on navigation bar
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// clickable link that brings you to url
export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc; //change active color
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #46c7c7; //change hover color
  }
`;

// text styling
export const MenuText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: Lato, sans-serif;
  color: #FFF;
  margin-right: 1rem;
`
