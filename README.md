# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



### xterm.js

参考
https://segmentfault.com/a/1190000041644571

https://juejin.cn/post/7081565139187138590

https://blog.csdn.net/duansamve/article/details/116751828

```
const terminalTitleTemplate = '[log]#'

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

const keyAction = () => {
    // 定义变量获取整行数据
    let currentLineData = ''
    // 历史行输入数据
    let historyLineData = []
    let last = 0
    // 使其能够输入汉字
    term.onData((key) => {
        console.log(key);
        //enter键
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

            term.write(`\r\n${terminalTitleTemplate}: `)
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
}

```
