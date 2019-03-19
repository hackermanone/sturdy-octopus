const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

// env
process.env.NODE_ENV = "production";

let mainWindow;
let addWindow;
// listen for app to be ready

app.on('ready', () => {
    // create new window
    mainWindow = new BrowserWindow({});
    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    })

    // build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu (overwrite default main menu)
    Menu.setApplicationMenu(mainMenu);
})



createAddWindow = () => {
        addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list item'
    });

    addWindow.loadFile("./addWindow.html");

    addWindow.on('closed', () => {
        addWindow = null;
    })
}

// catch the add item
ipcMain.on('item:add', (e, item) => {
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
})

// Create menu template

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click() {
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If mac, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add dev tools in dev mode
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        submenu: [
            {
                label: 'Toggle DevTools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}