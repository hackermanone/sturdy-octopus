require('dotenv').config();
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const url = require('url');
const path = require('path');

let win ; // main window
let portfolioWin; // create portfolio window
let profileWin;

app.on('ready', createWindow);

function createWindow() {
    win = new BrowserWindow({height:600, width:800, frame: false, webPreferences: { nodeIntegration: true }});
    win.loadFile('src/html/index.html');

    if (process.env.NODE_ENV !== 'production') {
        win.toggleDevTools();
    }

    // const winMenu = Menu.buildFromTemplate(winMenuTemplate);
    // Menu.setApplicationMenu(winMenu);

    // when window is closed, quit the application
    win.on('closed', () => {
        app.quit();
    })
}

function createPortfolioWindow() {
    portfolioWin = new BrowserWindow({parent: win, height: 600, width:700, frame: false});
    portfolioWin.loadFile('src/html/createPortfolio.html');
}

function showPortfolioWindow() {
    profileWin = new BrowserWindow({parent: win, height: 600, width: 800, frame: false});
    profileWin.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'html', 'createPortfolio.html'),
        protocol: "file:",
        slashes: true
    }))
}


ipcMain.on("refresh", (e, item) => {
    win.reload();
})

ipcMain.on("createPortfolioWindow", (e, item) => {
    createPortfolioWindow();
    if (process.env.NODE_ENV !== 'production') {
        portfolioWin.toggleDevTools();
    }
});

ipcMain.on("showPortfolioWindow", (e, item) => {
    showPortfolioWindow();
})

// const winMenuTemplate = [
//     {
//         label: "Menu",
//         submenu : [
//             {
//                 label: "Add Portfolio",
//                 accelerator: "Ctrl+A",
//                 click(item, focusedWindow) {
//                     createPortfolioWindow();
//                 }
//             },
//             {
//                 label: 'Developer Tools',
//                 submenu: [
//                     {
//                         label: 'Toggle DevTools',
//                         accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//                         click(item, focusedWindow) {
//                             focusedWindow.toggleDevTools();
//                         }
//                     },
//                     {
//                         role: 'reload'
//                     }
//                 ]
//             }
//         ]
//     }
// ]