import React from 'react';
import { Drawer } from 'antd'

type Props = {
    visible: boolean,
    //@ts-ignore
    onClose: (e: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>) => void
}

const NavDrawer: React.FC<Props> = ({ visible , onClose}) => {
    return (
        <Drawer placement="left"
                onClose={onClose}
                visible={visible}
                width={'20%'}
                title={'Navigation'}
                style={{fontFamily: 'Lato Bold'}}
                bodyStyle={{fontFamily: 'Lato', backgroundColor: '#566090', color: '#fff'}}
        >
            Hello
        </Drawer>
    );
};

export default NavDrawer;