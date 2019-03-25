/**
 * Render all portfolios
 */
const remote = require('electron').remote;
const { app } = remote; 
const fs = require('fs');
const path = require('path');

let desktopPath = app.getPath('desktop');
let portfoliosPath = path.join(desktopPath, process.env.PROJECT_NAME, 'portfolio');

// read dir and display
fs.readdir(portfoliosPath, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        let root = document.getElementById('root');
        let textNode = document.createTextNode(file);
        let br = document.createElement("br");

        root.appendChild(textNode);
        root.appendChild(br);
    })
})

