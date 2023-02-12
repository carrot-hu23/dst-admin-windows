
import { Card, Button, Space,message } from 'antd';
import RegenerateWorld from './reGenerateWorld';

const Operate = (props) => {
    //c_rollback("
    const rollback = (days)=>{
        const cmd = 'c_rollback("'+days+'")'
        window.excDstCommand("Master "+cmd)
        window.excDstCommand("Caves "+cmd)

        message.success("回档成功，天数：" +days)
    }

    return (
        <>
            <Card
                title="快捷操作"
                bordered={false}
            >
                <div>
                    <Space size={[10, 18]} wrap>
                        <Button onClick={()=>{rollback(1)}} >回档一天</Button>
                        <Button onClick={()=>{rollback(2)}} >回档两天</Button>
                        <Button onClick={()=>{rollback(3)}} >回档三天</Button>
                        <Button onClick={()=>{rollback(4)}} >回档四天</Button>
                        <Button onClick={()=>{rollback(5)}} >回档五天</Button>
                        <Button onClick={()=>{rollback(6)}} >回档六天</Button>
                    </Space>
                </div>
                <br /><br /><br /><br /><br />
                <div>
                    <RegenerateWorld />
                </div>
            </Card>
        </>
    )
}

export default Operate