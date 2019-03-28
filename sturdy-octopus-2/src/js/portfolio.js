const electron = require('electron');
const remote = electron.remote;
const { app } = remote; 
const { ipcRenderer } = electron;
const path = require('path');
const fs = require('fs');

let desktopPath = app.getPath('desktop');
let portfoliosPath = path.join(desktopPath, process.env.PROJECT_NAME, 'portfolio');
let notes = document.querySelector("#notes");
let div, note;


function renderNotes(portfolioName) {
    let userPortfolio = path.join(portfoliosPath, portfolioName);
    fs.readdir(userPortfolio, (err, files) => {
        if (err) throw err;
        files.forEach((file, index) => {
            let filePath = path.join(userPortfolio, file);
            fs.readFile(filePath, (err, data) => {
                if (err) throw err;
                div = document.createElement('div');
                note = document.createTextNode(data);
                div.appendChild(note);
                notes.appendChild(div);
            })
        })
    })

}