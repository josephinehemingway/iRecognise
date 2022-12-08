import React from 'react';
import './drawer.css'
import { useNavigate } from "react-router-dom";

type Props = {
    linkTo: string;
    // isSelected: boolean;
    title: string;
}

const NavItem: React.FC<Props> = ({linkTo, title}) => {

    let navigate = useNavigate();

    const onClick= () =>{
        navigate(linkTo);
    }

    return (
        <div className={'nav-item'} onClick={onClick}>
            {title}
        </div>

    );
};

export default NavItem;