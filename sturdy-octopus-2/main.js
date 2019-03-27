require('dotenv').config();
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let win ; // main window
let portfolioWin; // create portfolio window

app.on('ready', createWindow);

function createWindow() {
    win = new BrowserWindow({height:600, width:800, frame: false});
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
    portfolioWin = new BrowserWindow({parent: win, height: 600, width:700});
    portfolioWin.loadFile('src/html/createPortfolio.html');
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