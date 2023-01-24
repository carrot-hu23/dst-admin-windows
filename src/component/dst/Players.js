import { Image, List } from 'antd';

import { dstRoles } from '../../utils/dst';

const data = [
    {
        "eventlevel": 0,
        "name": "逐梦-轩辕",
        "netid": "76561199030234001",
        "prefab": "wanda",
        "colour": "FFA54F"
    },
    {
        "eventlevel": 0,
        "name": "𝔢𝔟𝔦",
        "netid": "76561198137844584",
        "prefab": "wolfgang",
        "colour": "CD4F39"
    },
    {
        "eventlevel": 0,
        "name": "冷鸟的甘露",
        "netid": "76561199377285534",
        "prefab": "wortox",
        "colour": "CDAA7D"
    },
    {
        "eventlevel": 0,
        "name": "Ducky",
        "netid": "76561199240925870",
        "prefab": "wickerbottom",
        "colour": "CD96CD"
    }
]

const Players = (props) => {

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={props.players || data}
                renderItem={(item) => (
                    <List.Item 
                    actions={
                        [<a 
                            target={'_blank'} 
                        href={'https://steamcommunity.com/profiles/' + item.netid} key="list-loadmore-edit"
                         style={{
                        background: 'url(https://dst.liuyh.com/static/img/dstui/icon_button_normal.png)'
                    }} rel="noreferrer">
                        <Image preview={false} width={22} src={'https://dst.liuyh.com/static/img/dstui/icon/steam_btn.png'} />
                        </a>]}>

                        <List.Item.Meta
                            avatar={<Image preview={false} width={36.8} src={dstRoles[item.prefab] || dstRoles['mod']} />}
                            description={<div style={{
                                color: '#' + item.colour,
                                marginTop: '4px',
                                fontSize: 16
                            }}>{item.name}</div>}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}
export default Players;