
import { Card, Button, Space } from 'antd';

const Operate = (props) => {

    return (
        <>
            <Card
                title="快捷操作"
                bordered={false}
            >

                <div>
                    <Space size={[8, 16]} wrap>
                        <Button size="small">回档一天</Button>
                        <Button size="small">回档两天</Button>
                        <Button size="small">回档三天</Button>
                        <Button size="small">回档四天</Button>
                        <Button size="small">回档五天</Button>
                        <Button size="small">回档六天</Button>
                    </Space>
                </div>
                <br />
                <div>
                    <Button size="small" type="primary" danger>重置世界</Button>
                </div>
            </Card>
        </>
    )
}

export default Operate