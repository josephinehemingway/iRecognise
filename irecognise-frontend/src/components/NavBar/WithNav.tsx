import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router';
import Navbar from "./index";
import { Layout, Menu } from 'antd';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined,
    CheckCircleOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {useNavigate} from "react-router-dom";
import {StreamsApi} from "../../utils/interfaces";
import Logo from '../../assets/logo-large.png'

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];


const WithNav = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [streamList, setStreamList] = useState<StreamsApi[]>([])

    const navigate = useNavigate();

    const handleClick = () => {
        setCollapsed(!collapsed)
    }

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    };

    useEffect(() => {
        fetch(`/streams`).then((res) =>
            res.json().then((data) => {
                setStreamList(data);
            })
        );
    }, []);

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    // @ts-ignore
    const deviceChildren = streamList.map(({streamId,stream_name}) => (
        getItem(stream_name,
            `streams/${streamId}`,
            <CheckCircleOutlined style={{color:"#a0e77f"}} />)
    ));

    return (
        <Layout>
            <Sider
                collapsedWidth={60}
                width={220}
                className="sider-style"
                trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={Logo} alt={'logo'} height={38} width={38}/>
                </div>
                <Menu
                    onClick={onClick}
                    className="menu-style"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: 'home',
                            icon: <HomeOutlined />,
                            label: 'Home',
                        },
                        {
                            key: 'uploads',
                            icon: <UploadOutlined />,
                            label: 'Uploads',
                        },
                        {
                            key: 'playback',
                            icon: <PlayCircleOutlined />,
                            label: 'Video Playback',
                        },
                        {
                            key: 'blacklist',
                            icon: <UserOutlined />,
                            label: 'Blacklist Database',
                        },
                        {
                            key: 'devices',
                            icon: <VideoCameraOutlined />,
                            label: 'Devices',
                            children: deviceChildren,
                        },
                    ]}
                />
            </Sider>
            <Layout className={'site-layout'}>
                <Navbar collapsed={collapsed} handleClick={handleClick}/>
                <Outlet />
            </Layout>
        </Layout>
    );
};

export default WithNav;
