const path = require('path');
const { app, ipcMain, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');

const child_process = require('child_process');

let dst_cli_stdin
let dst_cli_stdout

function uint8ArrayToString(fileData) {
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString
}

function utf8ByteToUnicodeStr(utf8Bytes) {
  var unicodeStr = "";
  for (var pos = 0; pos < utf8Bytes.length;) {
    var flag = utf8Bytes[pos];
    var unicode = 0;
    if ((flag >>> 7) === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;

    } else if ((flag & 0xFC) === 0xFC) {
      unicode = (utf8Bytes[pos] & 0x3) << 30;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 5] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 6;

    } else if ((flag & 0xF8) === 0xF8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 4] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 5;

    } else if ((flag & 0xF0) === 0xF0) {
      unicode = (utf8Bytes[pos] & 0xF) << 18;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 3] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 4;

    } else if ((flag & 0xE0) === 0xE0) {
      unicode = (utf8Bytes[pos] & 0x1F) << 12;;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 2] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 3;

    } else if ((flag & 0xC0) === 0xC0) { //110
      unicode = (utf8Bytes[pos] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 1] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 2;

    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    }
  }
  return unicodeStr;
}

function exc_dst_command(event, command) {
  console.log('command', command);
  // 发送指令
  dst_cli_stdin.write(command + '\n')

  dst_cli_stdout.on('data', data => {

    const res = utf8ByteToUnicodeStr(data)
    console.log('res', res);

    var obj = JSON.parse(res);
    if (obj.type === 2) {
      event.reply('dst-players-reply', obj)
    } else if (obj.type === 0) {
      event.reply('dst-op', "ok")
    } else {
      console.log('obj', obj);
    }

  })
}

function createWindow() {

  if (!isDev) {
    Menu.setApplicationMenu(null)
  }

  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      // nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  if (dst_cli_stdin === null || dst_cli_stdin === undefined) {
    console.log('############');
    var workerProcess = child_process.spawn("main.exe")
    //绑定输入和输出
    dst_cli_stdin = workerProcess.stdin
    dst_cli_stdout = workerProcess.stdout

    workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
  }

}
//ipcMain.on('set-title', handleSetTitle)
app.whenReady().then(() => {
  createWindow()
  ipcMain.on('exc-dst-command', exc_dst_command)
});

app.on('window-all-closed', () => {
  app.quit()
  if (dst_cli_stdin !== undefined && dst_cli_stdin !== null) {
    dst_cli_stdin.write("byte")
    dst_cli_stdin.end()
    console.log('close dst_cli')
  }

});



// const { app, BrowserWindow } = require('electron')
// const path = require('path')
// // const pkg = require('./package.json');

// let mainWindow

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })

//   // 加载应用----react 打包
//   //mainWindow.loadURL(url.format({
//   //pathname: path.join(__dirname, './build/index.html'),
//   //protocol: 'file:',
//   //slashes: true
//   //}))
//   // 加载应用----适用于 react 项目和开发阶段npm run electron
//   mainWindow.loadURL('http://localhost:3000/');
//   mainWindow.on('closed', function () {
//     mainWindow = null
//   })
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })

// app.on('activate', function () {
//   if (mainWindow === null) createWindow()
// })