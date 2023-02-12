// const _setImmediate = setImmediate;
// const _clearImmediate = clearImmediate;
// process.once('loaded', () => {
//     global.setImmediate = _setImmediate;
//     global.clearImmediate = _clearImmediate;
// });

console.log("loading preload.js");

const { ipcRenderer } = require('electron')

window.excDstCommand = (command) => {
    return ipcRenderer.send('exc-dst-command', command)
}

window.dstPlayersReply = (func)=>{
    ipcRenderer.on('dst-players-reply', (event, arg) => {
        func(event, arg)
    })
}

window.dstOp = (func)=>{
    ipcRenderer.on('dst-op', (event, arg) => {
        func(event, arg)
    })
}