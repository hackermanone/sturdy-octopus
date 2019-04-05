const electron = require('electron');
const remote = electron.remote;
const { app } = remote; 
const { ipcRenderer } = electron;
const path = require('path');
const fs = require('fs');

let desktopPath = app.getPath('desktop');
let portfolioPath; 

module.exports.deletePortfolio = (event) => {

    // console.log(event.target.getAttribute('for'));
    portfolioPath = path.join(desktopPath, process.env.PROJECT_NAME, 'portfolio', event.target.getAttribute('for'));
    deleteFolder(portfolioPath);
    emitRefresh();
}    

module.exports.addNote = function (directory, title, body) {
    let filePath = path.join(directory, title);
    fs.writeFile(filePath, body, (err) => {
        if (err) throw err;
    })
}

function deleteFolder(directory) {
    fs.readdirSync(directory).forEach((file) => {
        let curr = path.join(directory, file);
        //console.log(file);
        if (fs.lstatSync(curr).isDirectory()) {
            deleteFolder(curr);
        } else {
            fs.unlinkSync(curr);
        }
    })
    fs.rmdirSync(directory);
}

function emitRefresh() {
    ipcRenderer.send("refresh", "Hello");
}