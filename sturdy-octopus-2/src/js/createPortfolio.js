const remote = require('electron').remote;
const { app } = remote; 

const path = require('path');
const fs = require('fs');

let form = document.querySelector("form");
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // console.log(e);
    let desktopPath = app.getPath('desktop');
    let portfolioPath = path.join(desktopPath, 'test', 'portfolio');

    // create folder if it doesn't exist already
    if (!fs.existsSync(portfolioPath)) {
        createDirectory(portfolioPath);
    }

})

/**
 * @param {string} filepath 
 */
function createDirectory(filepath) {
    let directoryName = path.dirname(filepath);
    // base case
    if (fs.existsSync(filepath)) {
        return true;
    }

    createDirectory(directoryName);
    fs.mkdirSync(filepath);
}

    // Can only be used in node > 10.12 -- Current version is 10.11
    // if (!(fs.existsSync(portfolioPath))) {
    //     // create the directory
    //     fs.mkdir(portfolioPath, { recursive: true }, (err) => {
    //         if (err) throw err;
    //     })
    // }