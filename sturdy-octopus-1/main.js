const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

app.on('ready', () => {
    win = new BrowserWindow({width: 800, height: 600});
    
    win.loadFile("./main.html");

    win.on('closed', () => {
        app.quit();
    })
});





