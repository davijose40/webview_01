const { app, BrowserWindow, globalShortcut } = require('electron');
const config = require('./config');

let win;

function createWindow () {
  // Cria uma janela de navegação.
   win = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(config.url);

  // Open the DevTools.
  // win.webContents.openDevTools()
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

function createShortCuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady()
  .then(createWindow)
  .then(createShortCuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

