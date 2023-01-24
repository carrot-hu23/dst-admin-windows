import React from 'react';
import { Dropdown, message } from 'antd';
const onClick = ({ key }) => {
    if(key === '1') {
        message.info(`查看个人信息`);
    }
    if(key === '2') {
        message.info(`退出登录`);
    }
};
const items = [
    {
        label: '个人信息',
        key: '1',
    },
    {
        label: (<li class="ant-dropdown-menu-item-divider"></li>),
        // key: '3',
        // disabled: true
    },
    {
        label: (<div>退出登录</div>),
        key: '2',
    }
];
const Tittle = () => (
    <div
    >
        <Dropdown
            menu={{
                items,
                onClick,
            }}
            arrow={{
                pointAtCenter: true,
            }}
        >
            <p 
                onClick={(e) => e.preventDefault()}
                style={{
                    color: '#dfdfdf',
                }} >
                admin
            </p>
        </Dropdown>
    </div>

);
export default Tittle;