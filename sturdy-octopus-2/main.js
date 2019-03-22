const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

let win ; // main window
let portfolioWin; // create portfolio window

app.on('ready', createWindow);

const winMenuTemplate = [
    {
        label: "Menu",
        submenu : [
            {
                label: "Add Portfolio",
                accelerator: "Ctrl+A",
                click() {
                    createPortfolioWindow();
                }
            },
            {
                label: 'Developer Tools',
                submenu: [
                    {
                        label: 'Toggle DevTools',
                        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                        click(item, focusedWindow) {
                            focusedWindow.toggleDevTools();
                        }
                    },
                    {
                        role: 'reload'
                    }
                ]
            }
        ]
    }

]

function createWindow() {
    win = new BrowserWindow({height:600, width:800});
    win.loadFile('src/html/index.html');

    const winMenu = Menu.buildFromTemplate(winMenuTemplate);
    Menu.setApplicationMenu(winMenu);


    // when window is closed, quit the application
    win.on('closed', () => {
        app.quit();
    })
}

function createPortfolioWindow() {
    portfolioWin = new BrowserWindow({parent: win, height: 600, width:700})
    portfolioWin.loadFile('src/html/createPortfolio.html');
}

