const electron = require('electron');
const { app } = electron.remote;
const { ipcRenderer } = electron;
const path = require('path');
const fs = require('fs');

exports.close = () => {
    app.quit()
}

exports.closeWindow = () => {
    electron.remote.getCurrentWindow().close();
}

exports.addPortfolio = () => {
    ipcRenderer.send('createPortfolioWindow');
}