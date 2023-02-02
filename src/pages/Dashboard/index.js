import { useState, useEffect } from 'react';
import { Col, Row, Skeleton } from 'antd';
import GameStatus from './Status';

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

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Skeleton active loading={loading}>
                            <GameStatus/>
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