import { useState, useEffect } from 'react';
import { Col, Row, Skeleton } from 'antd';
import GameStatus from './Status';
import Operate from './Operate';

const Dashboard = () => {


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>
            {/* <GameStatistic data={gameData} />
            <br></br> */}
            <div>
                <Row gutter={[16, 8]}>

                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                        <Skeleton active loading={loading}>
                            <GameStatus/>
                        </Skeleton>
                    </Col>

                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <Skeleton active loading={loading}>
                            <Operate/>
                        </Skeleton>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Dashboard