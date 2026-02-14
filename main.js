const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 420,
        height: 720,
        frame: false,
        transparent: true,
        resizable: false,
        title: "ESP32 Color Sender",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Simpler for this small utility
        }
    });

    win.loadFile('index.html').catch(err => console.error("Failed to load index.html:", err));

    // Window control handlers
    // Remove existing listeners to avoid duplicates if recreated
    ipcMain.removeAllListeners('window-minimize');
    ipcMain.removeAllListeners('window-close');

    ipcMain.on('window-minimize', () => win.minimize());
    ipcMain.on('window-close', () => win.close());

    win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
