const app = require('app');
const BrowserWindow = require('browser-window');

var mainWindow = null;

const indexFile = 'file://' + __dirname + '/static/index.html';

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
  height:800,
  width:800
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(indexFile);
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
})
