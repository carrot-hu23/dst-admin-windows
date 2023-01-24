import { Col, Row, notification, Image, Skeleton } from 'antd';

import GameStatus from './component/GameStatus';

// import GameStatistic from './component/GameStatistic';
// import GameLog from './component/GameLog';

import { useState, useEffect } from 'react';

import { getGameDashboardApi } from '../../api/gameDashboardApi';
import { dstVersionApi } from '../../api/dstApi';
// import { SmileOutlined } from '@ant-design/icons';


const initData = {
    // "isInstallDst": false,
    // "masterStatus": false,
    // "cavesStatus": false,
    cpu: {
        "cores": 0,
        "cpuPercent": 0
    },
    mem: {
        "total": 0,
        "free": 0,
        "usedPercent": 0
    },
    disk: {
        "devices": [
            {
                "total": 0,
                "Usage": 0,
            }
        ]
    },
    memStates: 1513,
    masterPs:{
        cpuUage: "",
        memUage: "",
        VSZ: "",
        RSS: ""
    },
    cavesPs:{
        cpuUage: "",
        memUage: "",
        VSZ: "",
        RSS: ""
    }
}


const Dashboard = () => {

    const [api, contextHolder] = notification.useNotification();

    const updateNoticficationIcon = 'https://www.klei.com/sites/default/files/games/dont-starve-together/assets/dont-starve-togetherlayer2_0.png'

    const openNotification = (params) => {
        api.open({
            message: '饥荒有新的版本更新了',
            description: (
                <>
                    请点击更新游戏按钮。
                    <a target={'_blank'}
                        href={'https://forums.kleientertainment.com/game-updates/dst/'} key="list-loadmore-edit"
                        rel="noreferrer">
                        查看更新内容
                    </a>
                    <br />
                    <div>Vserion: {params}</div>
                </>
            ),
            icon: (<Image preview={false} width={32} src={updateNoticficationIcon} />),
        });
    };

    const [gameData, setGameData] = useState(initData)

    const [loading, setLoading] = useState(true)

    const initDashboard = () => {
        getGameDashboardApi()
            .then(response => {
                setGameData(response.data)
            })
    }

    const firstRequest = () => {
        getGameDashboardApi()
            .then(response => {

                setGameData(response.data)
                setLoading(false)

                const localVersion = response.data.version
                dstVersionApi()
                    .then(response => {
                        console.log(response);
                        if (response !== localVersion) {
                            openNotification(response)
                        }

                    })
            })
    }

    useEffect(() => {

        //firstRequest()

        // const timer = setInterval(() => {
        //     initDashboard()
        // }, 1000)

        setLoading(false)

        // return () => clearInterval(timer)
    }, [])

    return (
        <>
            {contextHolder}
            {/* <GameStatistic data={gameData} />
            <br></br> */}
            <div>
                <Row gutter={[16, 8]}>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Skeleton active loading={loading}>
                            <GameStatus data={gameData} />
                        </Skeleton>
                    </Col>

                    {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Skeleton active loading={loading}>
                            <GameLog data={gameData.masterLog} />
                        </Skeleton>
                    </Col> */}
                </Row>
            </div>
        </>
    );
};

export default Dashboard