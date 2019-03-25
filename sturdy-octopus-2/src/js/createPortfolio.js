const electron = require('electron');
const remote = electron.remote;
const { app } = remote; 
const { ipcRenderer } = electron;

const path = require('path');
const fs = require('fs');

let form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let message = document.getElementById('message');
    let inputVal = e.target.elements[0].value;
    // find the path we'll create the folder in 
    let desktopPath = app.getPath('desktop');
    let portfolioPath = path.join(desktopPath, process.env.PROJECT_NAME, 'portfolio', inputVal);

    // create folder if it doesn't exist already
    if (!fs.existsSync(portfolioPath)) {
        createDirectory(portfolioPath);
        message.innerHTML=`Success! Portfolio created for ${inputVal}`;
    } else {
        // portfolio already exists!
        message.innerHTML="That Portfolio name is already being used. Choose another or delete it";
    }
    // reset form
    e.target.reset();

    emitSubmit();
})

/**
 * Recursively create folder 
 * @param {string} filepath 
 */
function createDirectory(filepath) {
    // if file already exists
    if (fs.existsSync(filepath)) {
        return true;
    }

    let directoryName = path.dirname(filepath);
    // recurse on parent folder
    createDirectory(directoryName);
    fs.mkdirSync(filepath);
}

function emitSubmit() {
    ipcRenderer.send("form:submit", "Hello");
}