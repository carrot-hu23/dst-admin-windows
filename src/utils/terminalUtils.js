import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css"

function newTerminal(config, terminalTitleTemplate, elementById) {
    const terminal = {
        currentLineData: '',
        last: 0,
        historyLineData: [],
        term: new Terminal(config)
    }

    //var term = new Terminal(config);
    terminal.term.open(document.getElementById(elementById));
    // 进行适应容器元素大小
    let fitAddon = new FitAddon()
    terminal.term.loadAddon(fitAddon)
    fitAddon.fit()

    terminal.term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    if (terminal.term._initialized) {
        return
    }

    terminal.term._initialized = true

    terminal.term.prompt = () => {
        terminal.term.write(`\r\n${terminalTitleTemplate} `)
    }

    terminal.term.writeln('Welcome to xterm.js')
    terminal.term.writeln('欢迎使用 DST 管理后台，正在查看master日志.')
    terminal.term.writeln('Type some keys and commands to play around.')
    terminal.term.writeln('')
    terminal.term.prompt()
    // xterm.4.x 输入
    terminal.term.onKey(e => {
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
            if (terminal.currentLineData !== '') {
                //将当前行数据传入历史命令数组中存储
                terminal.historyLineData.push(terminal.currentLineData)
                //定义当前行命令在整个数组中的位置
                terminal.last = terminal.historyLineData.length - 1
            }
            //当输入clear时清空终端内容
            if (terminal.currentLineData === 'clear') {
                terminal.term.clear()
            }

            //在这可以进行发起请求将整行数据传入

            // 清空当前行数据
            terminal.currentLineData = ''

            terminal.term.write(`\r\n${terminalTitleTemplate} `)
        } else if (key.charCodeAt(0) === 127) {
            //删除键--》当前行偏移量x大于终端提示符所占位置时进行删除
            if (terminal.term._core.buffer.x > terminalTitleTemplate.length + 1) {
                terminal.currentLineData = terminal.currentLineData.slice(0, -1)
                terminal.term.write('\b \b')
            }
        } else if (key === '\u001b[A') {
            //up键的时候
            let len = 0
            if (terminal.historyLineData.length > 0) {
                len = terminal.historyLineData.length + 1
            }

            if (terminal.last < len && terminal.last > 0) {
                //当前行有数据的时候进行删除掉在进行渲染上存储的历史数据
                for (let i = 0; i < terminal.currentLineData.length; i++) {
                    if (terminal.term._core.buffer.x > terminalTitleTemplate.length + 1) {
                        terminal.term.write('\b \b')
                    }
                }
                let text = terminal.historyLineData[terminal.last - 1]
                terminal.term.write(text)
                //重点，一定要记住存储当前行命令保证下次up或down时不会光标错乱覆盖终端提示符
                terminal.currentLineData = text

                terminal.last--
            }
        } else if (key === '\u001b[B') {
            //down键
            let lent = 0
            if (terminal.historyLineData.length > 0) {
                lent = terminal.historyLineData.length - 1
            }
            if (terminal.last < lent && terminal.last > -1) {
                for (let i = 0; i < terminal.currentLineData.length; i++) {
                    if (terminal.term._core.buffer.x > terminalTitleTemplate.length + 1) {
                        terminal.term.write('\b \b')
                    }
                }
                let text = terminal.historyLineData[terminal.last + 1]
                terminal.term.write(text)
                terminal.currentLineData = text
                terminal.last++
            }
        } else {
            console.log(key);

            //啥也不做的时候就直接输入
            terminal.currentLineData += key
            terminal.term.write(key)
        }
    })

    return terminal
}

export {newTerminal}