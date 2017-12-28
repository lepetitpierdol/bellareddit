const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
const url = require('url')
const randomstring = require('randomstring');
const querystring = require('query-string');
const axios = require('axios');

const redditConfig = {
  clientID: 'qdNYFAYykXPQAQ'
};

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })

  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('authorize', (event, arg) => {
  const state = randomstring.generate({
    length: 16,
    charset: 'alphabetic'
  });

  const redirectURI = encodeURI('http://bellareddit.pandarosso.eu');
  const url = `https://www.reddit.com/api/v1/authorize?client_id=${redditConfig.clientID}&response_type=code&state=${state}&redirect_uri=${redirectURI}&duration=temporary&scope=identity,read,subscribe,vote,mysubreddits,flair`

  let authWindow = new BrowserWindow({
    width: 600,
    height: 600,
    parent: win,
    modal: true
  });

  authWindow.loadURL(url);

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    if (newUrl.indexOf('http://bellareddit.pandarosso.eu') > -1) {
      console.log('redirect detected');

      let qs = querystring.parse(newUrl);

      if (qs.code) {
        console.log('code found on querystring', qs.code);

        axios.request({
          url: 'https://www.reddit.com/api/v1/access_token',
          data: {
            grant_type: 'authorization_code',
            redirect_uri: redirectURI,
            code: qs.code
          },
          headers: {
            'Content-Type': 'application/json'
          },
          auth: {
            username: redditConfig.clientID,
            password: ''
          }
        })
        .then(res => {
          console.dir(res.data);
          ipcRenderer.send('authorized', res.data);
        })
        .catch(res => {
          console.dir(res);
        })
      }
    }
  });

  authWindow.on('closed', () => {
    authWindow = null
  });
});




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
