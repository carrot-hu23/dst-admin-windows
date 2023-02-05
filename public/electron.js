const path = require('path');

const { app, BrowserWindow,Menu } = require('electron');

const isDev = require('electron-is-dev');

function createWindow() {
  Menu.setApplicationMenu(null)
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    // webPreferences: {
    //   nodeIntegration: true,
    // },
    webPreferences: {
      // nodeIntegration: false,
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
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
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
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