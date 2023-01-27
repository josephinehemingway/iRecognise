import React from 'react';
import { Outlet } from 'react-router';
import Navbar from "./index";

const WithNav = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default WithNav;
