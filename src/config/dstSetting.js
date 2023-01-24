
import midsummer_cawnival from '../assets/midsummer_cawnival.png'
import haallowed_nights from '../assets/haallowed_nights.png'
import winters_least from '../assets/winters_least.png'
import year_of_the_gobbler from '../assets/year_of_the_gobbler.png'
import year_of_the_catcoon from '../assets/year_of_the_catcoon.png'
import year_of_the_varg from '../assets/year_of_the_varg.png'
import year_of_the_pig_king from '../assets/year_of_the_pig_king.png'
import year_of_the_carrat from '../assets/year_of_the_carrat.png'
import year_of_the_beefalo from '../assets/year_of_the_beefalo.png'

import wildfires from '../assets/wildfires.png'

const wordSettings = {
    global: {
        name: "全局",
        data: [
            {
                lable_cn: '活动',
                lable: 'Events',
                default: 'Auto',
                list: [
                    {
                        name: '自动',
                        value: 'Auto'
                    },
                    {
                        name: '无',
                        value: 'None'
                    }
                ]
            },
            {
                lable_cn: '秋',
                lable: 'Autumn',
                default: 'default',
                list: [
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '长',
                        value: 'Long'
                    },
                    {
                        name: '极长',
                        value: 'Very Long'
                    },
                    {
                        name: '随机',
                        value: 'Random'
                    }
                ]
            },
            {
                lable_cn: '冬',
                lable: 'Winter',
                default: 'default',
                list: [
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '长',
                        value: 'Long'
                    },
                    {
                        name: '极长',
                        value: 'Very Long'
                    },
                    {
                        name: '随机',
                        value: 'Random'
                    }
                ]
            },
            {
                lable_cn: '春',
                lable: 'Spring',
                default: 'default',
                list: [
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '长',
                        value: 'Long'
                    },
                    {
                        name: '极长',
                        value: 'Very Long'
                    },
                    {
                        name: '随机',
                        value: 'Random'
                    }
                ]
            },
            {
                lable_cn: '夏',
                lable: 'Summary',
                default: 'default',
                list: [
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '长',
                        value: 'Long'
                    },
                    {
                        name: '极长',
                        value: 'Very Long'
                    },
                    {
                        name: '随机',
                        value: 'Random'
                    }
                ]
            },
            {
                lable_cn: '昼夜选项',
                lable: 'Day Type',
                default: 'default',
                list: [
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '长 白天',
                        value: 'Long Day'
                    },
                    {
                        name: '长 黄昏',
                        value: 'Long Dusk'
                    },
                    {
                        name: '长 夜晚',
                        value: 'Long Night'
                    },
                    {
                        name: '无 白天',
                        value: 'No Day'
                    },
                    {
                        name: '无 黄昏',
                        value: 'No Dusk'
                    },
                    {
                        name: '无 夜晚',
                        value: 'No Night'
                    },
                    {
                        name: '仅 白天',
                        value: 'Only Day'
                    },
                    {
                        name: '仅 黄昏',
                        value: 'Only Dusk'
                    },
                    {
                        name: '仅 夜晚',
                        value: 'Only Night'
                    }
                ]
            },
            {
                lable_cn: '出生模式',
                lable: 'Spawn Mode',
                default: 'Florid Postern',
                list: [
                    {
                        name: '绚丽之门',
                        value: 'Florid Postern'
                    }
                    ,
                    {
                        name: '随机',
                        value: 'Random'
                    }
                    ,
                ]
            },
            {
                lable_cn: '冒险家死亡',
                lable: 'Survivor Death',
                default: 'Becomme Ghost',
                list: [
                    {
                        name: '变鬼魂',
                        value: 'Becomme Ghost'
                    },
                    {
                        name: '更改冒险家',
                        value: 'Change Survivor'
                    }
                ]
            },
            {
                lable_cn: '在绚丽之门复活',
                lable: 'Revive At Florid Postern',
                default: 'Enabled',
                list: [
                    {
                        name: '启用',
                        value: 'Enabled'
                    },
                    {
                        name: '禁用',
                        value: 'Disabled'
                    }
                ]
            },
            {
                lable_cn: '鬼魂理智值惩罚',
                lable: 'Ghost Sanity Drain',
                default: 'Disabled',
                list: [
                    {
                        name: '禁用',
                        value: 'Disabled'
                    },
                    {
                        name: '启用',
                        value: 'Enabled'
                    }
                ]
            },
            {
                lable_cn: '死亡重置倒计时',
                lable: 'Death Reset Timer',
                default: 'Disabled',
                list: [
                    {
                        name: '禁用',
                        value: 'Disabled'
                    },
                    {
                        name: '慢',
                        value: 'Slow'
                    },
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '快',
                        value: 'Fast'
                    },
                    {
                        name: '立刻',
                        value: 'Instant'
                    },
                ]
            },
            {
                lable_cn: '皮弗娄牛交配频率',
                lable: 'beefaloheat',
                default: 'Default',
                list: [
                    {
                        name: '无',
                        value: 'never'
                    },
                    {
                        name: '很少',
                        value: 'rare'
                    },
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '较多',
                        value: 'often'
                    },
                    {
                        name: '大量',
                        value: 'always'
                    },

                ]
            },
            {
                lable_cn: '坎普斯',
                lable: 'krampus',
                default: 'Default',
                list: [
                    {
                        name: '无',
                        value: 'never'
                    },
                    {
                        name: '很少',
                        value: 'rare'
                    },
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '较多',
                        value: 'often'
                    },
                    {
                        name: '大量',
                        value: 'always'
                    },
                ]
            },
        ]   
    },
    events: {
        name: '活动',
        data: [
            {
                lable_cn: '盛夏鸦年华',
                lable: 'midsummer_cawnival',
                default: 'Default',
                icon: midsummer_cawnival,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '万圣夜',
                lable: 'haallowed_nights',
                default: 'Default',
                icon: haallowed_nights,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '冬季盛宴',
                lable: 'winters_feast',
                default: 'Default',
                icon: winters_least,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '火鸡之年',
                lable: 'year_of_the_gobbler',
                default: 'Default',
                icon: year_of_the_gobbler,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '座狼之年',
                lable: 'year_of_the_varg',
                default: 'Default',
                icon: year_of_the_varg,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '猪王之年',
                lable: 'year_of_the_pig',
                default: 'Default',
                icon: year_of_the_pig_king,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '胡萝卜鼠之年',
                lable: 'year_of_the_carrat',
                default: 'Default',
                icon: year_of_the_carrat,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '皮弗娄牛之年',
                lable: 'year_of_the_beefalo',
                default: 'Default',
                icon: year_of_the_beefalo,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
            {
                lable_cn: '浣猫之年',
                lable: 'year_of_the_catcoon',
                default: 'Default',
                icon: year_of_the_catcoon,
                list: [
                    {
                        name: '默认',
                        value: 'Default'
                    },
                    {
                        name: '总是',
                        value: 'enabled'
                    }
                ]
            },
        ]
    },
    world: {
        name: '世界',
        data: [
            {
                lable_cn: '野火',
                lable: 'wildfires',
                default: 'Default',
                icon: wildfires,
                list: [
                    {
                        name: '无',
                        value: 'never'
                    },
                    {
                        name: '很少',
                        value: 'rare'
                    },
                    {
                        name: '默认',
                        value: 'default'
                    },
                    {
                        name: '较多',
                        value: 'often'
                    },
                    {
                        name: '大量',
                        value: 'always'
                    },
                ]
            }
        ]
    }
}


const dstSetting = {
    forest: {
        wordSettings: wordSettings,
        wordGeneration: {}
    },

    caves: {

    }

}

export {
    dstSetting
}