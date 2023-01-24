import { Tabs } from 'antd';

import Players from '../../../component/dst/Players';
import HomeOverView from '../../../component/dst/HomeOverView';
import HomeModInfo from '../../../component/dst/HomeModInfo';

const HomeDetail = (props) => {

    const players = props.home.successinfo.players || []
    const home = props.home.successinfo || {}
    const mods = props.home.successinfo.mods_info || {}
    const items = [
        {
            label: '概要',
            key: '1',
            children: (<div>{<HomeOverView home={home}/>}</div>)
        },
        {
            label: '玩家',
            key: '2',
            children: (<div>{<Players players={players} />}</div>)
        },
        {
            label: '世界',
            key: '3',
            children: (<div>世界</div>)
        },
        {
            label: 'MOD',
            key: '4',
            children: (<div>{<HomeModInfo mods={mods} />}</div>)
        }
    ]

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                centered
                items={items}
            />
        </>
    )
}

export default HomeDetail