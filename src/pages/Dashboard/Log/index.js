
import { Card, message } from 'antd';
import { useEffect } from 'react';
import { newTerminal } from '../../../utils/terminalUtils';

const terminalTitleTemplate = '[log]#'

const config = {
    //渲染类型
    rendererType: 'canvas',
    //是否禁用输入
    disableStdin: false,
    //光标样式
    cursorStyle: 'underline',
    // 启用时光标将设置为下一行的开头
    convertEol: true,
    //终端中的回滚量
    scrollback: 100,
    fontSize: 14,
    //行数
    rows: 24,
    // 光标闪烁
    cursorBlink: true,
    theme: {
        //   字体
        foreground: '#ffffff',
        background: '#000000',
        // 光标
        cursor: 'help',
        lineHeight: 18,
    },
}

const GameLog = (props) => {
    // const [data] = useState({path: props.data});
    // console.log(data)
    useEffect(() => {
        
        const terminal = newTerminal(config, terminalTitleTemplate, 'terminal')
        if(!!window.WebSocket && window.WebSocket.prototype.send) {
            // message.success('您的浏览器支持Websocket通信协议')
        } else{
            message.error('对不起, 您的浏览器不支持Websocket通信协议')
        }
        // 这里的转发标识为/ws
        const wsPath = `ws://1.12.223.51:8888/ws`
        const socket = new WebSocket(wsPath)
        socket.onopen= ()=> {
            console.log("webSocket连接成功")
            socket.send("nihao")
            const message = 'tailf ' + props.data
            console.log('path',props.data)
            socket.send(message)
        }
        socket.onerror= ()=> {
            console.log("连接错误");
        }
        socket.onmessage = (e)=> {
            //console.log(e.data);
            terminal.term.writeln(e.data)
        }
        socket.onclose = (e)=> {
            console.log('webSocket 关闭了');
        }
        return ()=> socket.close()
    }, [props.data])


    return (
        <>
            <Card
                title="游戏日志"
                bordered={false}
            >
                <div className="container-children" style={{ height: "100%" }}>
                    <div id="terminal" ></div>
                </div>

            </Card>

        </>
    )
}

export default GameLog

/**

let term = new Terminal({
    // 渲染类型
    rendererType: 'canvas',
    //   是否禁用输入
    disableStdin: false,
    cursorStyle: 'underline',
    //   启用时光标将设置为下一行的开头
    convertEol: true,
    // 终端中的回滚量
    scrollback: 10,
    fontSize: 14,
    rows: 20,
    // 光标闪烁
    cursorBlink: true,
    theme: {
        //   字体
        foreground: '#ffffff',
        background: '#000000',
        // 光标
        cursor: 'help',
        lineHeight: 18,
    },
})

// 换行并输入起始符 $
term.prompt = () => {
    term.write(`\r\n${terminalTitleTemplate}:`)
}

// 进行适应容器元素大小
let fitAddon = new FitAddon()
term.loadAddon(fitAddon)
fitAddon.fit()

let currentLineData = ''
// 历史行输入数据
let historyLineData = []
let last = 0

*/

/*


var term = new Terminal(config);
        term.open(document.getElementById('terminal'));
        // 进行适应容器元素大小
        term.loadAddon(fitAddon)
        fitAddon.fit()

        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

        if (term._initialized) {
            return
        }

        term._initialized = true

        term.prompt = () => {
            term.write(`\r\n${terminalTitleTemplate} `)
        }

        term.writeln('Welcome to xterm.js')
        term.writeln('欢迎使用 DST 管理后台，正在查看master日志.')
        term.writeln('Type some keys and commands to play around.')
        term.writeln('')
        term.prompt()
        // xterm.4.x 输入
        term.onKey(e => {
            // const ev = e.domEvent
            // const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
            // if (ev.keyCode === 13) {
            //     term.prompt()
            // } else if (ev.keyCode === 8) {
            //     // Do not delete the prompt
            //     if (term._core.buffer.x > 2) {
            //         term.write('\b \b')
            //     }
            // } else if (printable) {
            //     term.write(e.key);
            //     //webSocket.send(e.key);
            // }
            let key = e.key
            if (key.charCodeAt(0) === 13) {
                // 将行数据进行添加进去
                if (currentLineData !== '') {
                    //将当前行数据传入历史命令数组中存储
                    historyLineData.push(currentLineData)
                    //定义当前行命令在整个数组中的位置
                    last = historyLineData.length - 1
                }
                //当输入clear时清空终端内容
                if (currentLineData === 'clear') {
                    term.clear()
                }

                //在这可以进行发起请求将整行数据传入

                // 清空当前行数据
                currentLineData = ''

                term.write(`\r\n${terminalTitleTemplate} `)
            } else if (key.charCodeAt(0) === 127) {
                //删除键--》当前行偏移量x大于终端提示符所占位置时进行删除
                if (term._core.buffer.x > terminalTitleTemplate.length + 1) {
                    currentLineData = currentLineData.slice(0, -1)
                    term.write('\b \b')
                }
            } else if (key === '\u001b[A') {
                //up键的时候
                let len = 0
                if (historyLineData.length > 0) {
                    len = historyLineData.length + 1
                }

                if (last < len && last > 0) {
                    //当前行有数据的时候进行删除掉在进行渲染上存储的历史数据
                    for (let i = 0; i < currentLineData.length; i++) {
                        if (term._core.buffer.x > terminalTitleTemplate.length + 1) {
                            term.write('\b \b')
                        }
                    }
                    let text = historyLineData[last - 1]
                    term.write(text)
                    //重点，一定要记住存储当前行命令保证下次up或down时不会光标错乱覆盖终端提示符
                    currentLineData = text

                    last--
                }
            } else if (key === '\u001b[B') {
                //down键
                let lent = 0
                if (historyLineData.length > 0) {
                    lent = historyLineData.length - 1
                }
                if (last < lent && last > -1) {
                    for (let i = 0; i < currentLineData.length; i++) {
                        if (term._core.buffer.x > terminalTitleTemplate.length + 1) {
                            term.write('\b \b')
                        }
                    }
                    let text = historyLineData[last + 1]
                    term.write(text)
                    currentLineData = text
                    last++
                }
            } else {
                console.log(key);

                //啥也不做的时候就直接输入
                currentLineData += key
                term.write(key)
            }
        })


*/
