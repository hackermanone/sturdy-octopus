require('dotenv').config();
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = electron;
const url = require('url');
const path = require('path');

let win ; // main window
let createPortfolioWin; // create portfolio window
let portfolioWin;

process.env.PROJECT_NAME = process.env.PROJECT_NAME || "BBQuotes"

app.on('ready', createWindow);

function createWindow() {
    win = new BrowserWindow({height:600, width:800, frame: false, webPreferences: { nodeIntegration: true }});
    win.loadFile('src/html/index.html');
    
    // global shortcuts
    const reg = globalShortcut.register('CommandOrControl+G', () => {
        createPortfolioWindow();
    })

    if (process.env.NODE_ENV !== 'production') {
        win.toggleDevTools();
    }

    // when window is closed, quit the application
    win.on('closed', () => {
        app.quit();
    })
}

function createPortfolioWindow() {
    createPortfolioWin = new BrowserWindow({parent: win, height: 300, width:400, frame: false});
    createPortfolioWin.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'html', 'createPortfolio.html'),
        protocol: "file:",
        slashes: true

    }));
}

function showPortfolioWindow() {
    portfolioWin = new BrowserWindow({parent: win, height: 600, width: 800, frame: false});
    portfolioWin.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'html', 'portfolio.html'),
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
        createPortfolioWin.toggleDevTools();
    }
});

ipcMain.on("showPortfolioWindow", (e, item) => {
    showPortfolioWindow();
    if (process.env.NODE_ENV !== 'production') {
        portfolioWin.toggleDevTools();
    }

    global.currUser = item;
    // portfolioWin.webContents.once("dom-ready", () => {
    //     portfolioWin.webContents.send("render:notes", item);
    // });
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