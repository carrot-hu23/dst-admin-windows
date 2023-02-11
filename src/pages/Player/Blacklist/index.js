import { ProCard } from '@ant-design/pro-components';
import { Row, Col, Button, Divider, Space } from 'antd';
import { dstRoles } from '../../../utils/dst';

const dataSource = [
    {
        name: '语雀的天空',
        image: dstRoles['wendy'],
        desc: 'KU_***',
        days: 12
    },
    {
        name: 'Ant Design',
        image: dstRoles['wx78'],
        desc: 'KU_***',
        days: 1
    },
    {
        name: '猜猜我是谁',
        image: dstRoles['winona'],
        desc: 'KU_***',
        days: 18
    },
];


const Blacklist = (props)=>{
    const list = dataSource.map((item) => {
        return (
            <>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Space size={'middle'}>
                        <span>{item.desc}</span>
                    </Space>

                </Col>
                <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <Space style={{ float: 'right' }}>
                        <Button type="link" onClick={() => { console.log(item); }} >修改</Button>
                        <Button type="link" danger >删除</Button>
                    </Space>
                </Col>
                <Divider style={{margin:'0px'}} />
            </>
        )
    })

    return (
        <>
            <ProCard
                // title="在线玩家"
                // extra="extra"
                // layout="center"
                direction="column">
                <Row align="middle" gutter={[8, 20]} style={{rowGap: '12px'}}>
                    {list}
                </Row>
                <br />
            </ProCard>
        </>
    )
}

export default Blacklist