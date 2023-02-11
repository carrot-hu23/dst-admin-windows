import { Card, Button } from 'antd';
const About = () => {

    const start = ()=>{
        console.log('starting');
    }

    const write = ()=>{
        console.log('writing');

        window.excDstCommand("Master all_players()")
        window.dstPlayersReply((event, arg)=>{
            console.log('reply', arg);
        })
    }

    return (
        <>
            <Button onClick={start}>start</Button>
            <Button onClick={write}>sent</Button>
            <Card>
                <h3>version: 0.1.0</h3>
                <span>支持 MIT 开源协议</span>
                <br></br>
                <br></br>
                <span><a target={'_blank'} rel="noreferrer" href='https://github.com/hujinbo23/dst-admin-windows'>项目地址: https://github.com/hujinbo23/dst-admin-windows</a></span>
            </Card>
        </>
    )
}

export default About