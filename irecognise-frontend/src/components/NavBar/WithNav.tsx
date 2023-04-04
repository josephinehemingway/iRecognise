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
    PlayCircleOutlined,
    CloseCircleOutlined,
    PlaySquareOutlined
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
    const deviceChildren = streamList.map(({streamId,stream_name, active}) => (
        getItem(stream_name,
            `streams/${streamId}`,
            active ?
                    <CheckCircleOutlined style={{color: "#a0e77f"}} /> :
                    <CloseCircleOutlined style={{color: "#c74668"}} />
        )
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
                        getItem('Home', 'home', <HomeOutlined />),
                        getItem('Livestreams', 'live', <PlaySquareOutlined />),
                        getItem('Uploads', 'uploads', <UploadOutlined />),
                        getItem('Video Playback', 'playback', <PlayCircleOutlined />),
                        getItem('Blacklist Database', 'blacklist', <UserOutlined />),
                        getItem('Devices', 'devices', <VideoCameraOutlined />, deviceChildren),
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
