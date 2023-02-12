import { ProCard } from '@ant-design/pro-components';
import { Image, Row, Col, Button, Divider, Space, Skeleton, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { dstRoles } from '../../../utils/dst';
import { QuestionCircleOutlined } from '@ant-design/icons';

const Online = (props) => {

    const [listData, setListData] = useState({})
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState(false)

    const refresh = () => {
        setLoading(true)
        players()
    }

    //TheNet:Kick()
    const kilckPlayer = (player) => {
        const cmd = 'TheNet:Kick("' + player.ku + '")'
        window.excDstCommand("Master " + cmd)

        message.success("提出 " + player.name + " success")
    }

    const killPlayer = (player) => {
        const cmd = "UserToPlayer('"+player.ku+"'):PushEvent('death')"
        window.excDstCommand("Master " + cmd)

        message.success("kill " + player.name + " success")
    }
    //UserToPlayer('%s'):PushEvent('respawnfromghost')
    const respawnPlayer = (player) => {
        const cmd = "UserToPlayer('"+player.ku+"'):PushEvent('respawnfromghost')"
        window.excDstCommand("Master " + cmd)

        message.success("复活 " + player.name + " success")
    }

    const pullPlayer2BlockList = (player) => {
        message.warning("未实现拉黑")
    }
    const pullPlayer2AdminList = (player) => {
        message.warning("未实现设置管理员")
    }

    const players = () => {
        window.excDstCommand("Master all_players()")
        window.dstPlayersReply((event, arg) => {
            console.log('reply', arg);

            const list = arg.data.map((item) => {
                return (
                    <><Col xs={24} sm={10} md={10} lg={10} xl={10} key={item.key}>
                        <Space align="center" size={'middle'}>
                            <div>
                                <Image preview={false} width={48} src={dstRoles[item.role] || dstRoles['mod']} />
                            </div>
                            <div>
                                {item.name}
                            </div>
                            <div>
                                <span style={{ color: '#1677ff' }}>{item.ku}</span>
                            </div>
                        </Space>
                    </Col>
                        <Col xs={8} sm={4} md={4} lg={4} xl={4}>
                            <Space size={'middle'}>
                                <span>{item.day}天</span>
                            </Space>

                        </Col>
                        <Col xs={16} sm={10} md={10} lg={10} xl={10}>
                            <Space style={{ float: 'right' }}>
                                <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >kill</Button>
                                <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >复活</Button>
                                <Button size={'small'} type="primary" onClick={() => { kilckPlayer(item) }} >踢出</Button>
                                <Button size={'small'} danger onClick={() => { pullPlayer2BlockList(item) }} >拉黑</Button>
                                <Button size={'small'} type="primary" onClick={() => { pullPlayer2AdminList(item) }} >管理员</Button>
                            </Space>
                        </Col>
                        <Divider style={{ margin: '0px' }} />
                    </>
                )
            })

            setListData(list)
            setLoading(false)
            setDone(true)
        })
        setTimeout(() => {
            console.log('listData', listData, typeof listData);

            if (done === false) {
                setListData()
                setLoading(false)
            }
        }, 3000)
    }

    useEffect(() => {

        console.log('get players');
        players()
    }, [])

    // const list = dataSource.map((item) => {
    //     return (
    //         <><Col xs={24} sm={10} md={10} lg={10} xl={10}>
    //             <Space align="center" size={'middle'}>
    //                 <div>
    //                     <Image preview={false} width={48} src={item.image || dstRoles['mod']} />
    //                 </div>
    //                 <div>
    //                     {item.name}
    //                 </div>
    //                 <div>
    //                     <span style={{color: '#1677ff'}}>{item.desc}</span>
    //                 </div>
    //             </Space>
    //         </Col>
    //             <Col xs={8} sm={4} md={4} lg={4} xl={4}>
    //                 <Space size={'middle'}>
    //                     <span>{item.days}天</span>
    //                 </Space>

    //             </Col>
    //             <Col xs={16} sm={10} md={10} lg={10} xl={10}>
    //                 <Space style={{ float: 'right' }}>
    //                 {/* <Tag color="success" onClick={() => { console.log(item); }}>踢出</Tag>
    //                 <Tag color="processing" onClick={() => { console.log(item); }}>拉黑</Tag>
    //                 <Tag color="error" onClick={() => { console.log(item); }}>管理员</Tag> */}
    //                     <Button size={'small'} onClick={() => { console.log(item); }} >踢出</Button>
    //                     <Button size={'small'} danger >拉黑</Button>
    //                     <Button size={'small'} type="primary" >管理员</Button>
    //                 </Space>
    //             </Col>
    //             <Divider style={{margin:'0px'}} />
    //         </>
    //     )
    // })

    return (
        <>
            <Space>

                <Button onClick={refresh}>刷新玩家</Button>
                <Tooltip title="刷新时，鼠标请勿乱点，等待指令输入完成">
                    <QuestionCircleOutlined />
                </Tooltip>
            </Space>
            <ProCard
                // title="在线玩家"
                // extra="extra"
                layout="center"
                direction="column">
                <Row align="middle" gutter={[16, 24]} style={{ rowGap: '14px' }}>
                    <Skeleton loading={loading} active >
                        {listData}
                    </Skeleton>
                </Row>
                <br />
            </ProCard>
        </>
    )
}

export default Online