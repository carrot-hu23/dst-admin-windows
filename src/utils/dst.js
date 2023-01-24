const dstRoles = {
    wendy: 'https://dst.liuyh.com/static/img/dstui/icon/wendy_inv.png',
    wilson: 'https://dst.liuyh.com/static/img/dstui/icon/wilson_inv.png',
    willow: 'https://dst.liuyh.com/static/img/dstui/icon/willow_inv.png',
    wolfgang: 'https://dst.liuyh.com/static/img/dstui/icon/wolfgang_inv.png',
    wx78: 'https://dst.liuyh.com/static/img/dstui/icon/wx78_inv.png',
    wickerbottom: 'https://dst.liuyh.com/static/img/dstui/icon/wickerbottom_inv.png',
    woodie: 'https://dst.liuyh.com/static/img/dstui/icon/woodie_inv.png',
    wes: 'https://dst.liuyh.com/static/img/dstui/icon/wes_inv.png',
    waxwell: 'https://dst.liuyh.com/static/img/dstui/icon/waxwell_inv.png',
    wathgrithr: 'https://dst.liuyh.com/static/img/dstui/icon/wathgrithr_inv.png',
    webber: 'https://dst.liuyh.com/static/img/dstui/icon/webber_inv.png',
    winona: 'https://dst.liuyh.com/static/img/dstui/icon/winona_inv.png',
    warly: 'https://dst.liuyh.com/static/img/dstui/icon/warly_inv.png',
    walter: 'https://dst.liuyh.com/static/img/dstui/icon/walter_inv.png',
    wortox: 'https://dst.liuyh.com/static/img/dstui/icon/wortox_inv.png',
    wormwood: 'https://dst.liuyh.com/static/img/dstui/icon/wormwood_inv.png',
    wurt: 'https://dst.liuyh.com/static/img/dstui/icon/wurt_inv.png',
    wanda: 'https://dst.liuyh.com/static/img/dstui/icon/wanda_inv.png',
    wonkey: 'https://dst.liuyh.com/static/img/dstui/icon/wonkey_inv.png',
    mod: 'https://dst.liuyh.com/static/img/dstui/icon/mod_ch_inv.png',
    "": 'https://dst.liuyh.com/static/img/dstui/icon/unknown_ch_inv.png',

}


//选择服务器的游戏风格。
const dstGameMod = [
    {
        cn: '轻松',
        name: 'relaxed',
        description: `更轻松的游戏方式,更少受到来自世界的威胁。\n 
        饥饿、寒冷、过热和黑暗将不会杀死冒险家。\n
        降低冒险家受到的伤害。永远可以在绚丽之门复活。\n`
    },
    {
        cn: '无尽',
        name: 'endless',
        description: `永不结束的饥荒沙盒模式。\n
        永远可以在绚丽之门复活。\n
        `
    },
    {
        cn: '生存',
        name: 'survival',
        description: `标准《饥荒》体验。\n`
    },
    {
        cn: '荒野',
        name: 'wilderness',
        description: `外面就是荒野,充满了危险!\n
        随机进入世界的一个地方。
        死亡之后:选一名新冒险家试一下、再试一下。\n
        `
    },
    {
        cn: '暗无天日',
        name: 'lights out',
        description: `在标准《饥荒》体验的基础上添加黑暗基调。\n
        `
    },

]

export {
    dstRoles, dstGameMod
}