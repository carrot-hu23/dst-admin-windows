import { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Skeleton } from 'antd';

import './index.css';

import Administrator from './Administrator';
import Blacklist from './Blacklist';
import Online from './Online';


const Player = () => {


    const [tab, setTab] = useState('tab1')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
    },[])
    const tabs = {
        activeKey: tab,
        items: [
            {
                label: `在线玩家`,
                key: 'tab1',
                children: <Online></Online>,
            },
            {
                label: `黑名单`,
                key: 'tab2',
                children: <Blacklist></Blacklist>,
            },
            {
                label: `管理员`,
                key: 'tab3',
                children: <Administrator></Administrator>,
            },
        ],
        onChange: (key) => {
            setTab(key);
        },
    }
    return <Skeleton loading={loading} active > <ProCard tabs={tabs} /></Skeleton>
}

export default Player
