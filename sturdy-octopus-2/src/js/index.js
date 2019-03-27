/**
 * Render all portfolios
 */
const { remote, ipcRenderer } = require('electron');
const { app } = remote; 
const fs = require('fs');
const path = require('path');
const { deletePortfolio } = require("./fileHelper");

let desktopPath = app.getPath('desktop');
let portfoliosPath = path.join(desktopPath, process.env.PROJECT_NAME, 'portfolio');

// read dir and display
fs.readdir(portfoliosPath, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        let root = document.getElementById('root'),
            portfolioDiv = document.createElement('div'),
            text = document.createTextNode(file),
            br = document.createElement('br'),
            optionsDiv = document.createElement('div'),
            optionsText = document.createTextNode('Delete'),
            optionsAttr = document.createAttribute("for");

        optionsAttr.value = file;
        optionsDiv.setAttributeNode(optionsAttr);
        optionsDiv.appendChild(optionsText);
        optionsDiv.classList.add('portfolio-block-options');
        portfolioDiv.appendChild(text);
        portfolioDiv.classList.add('portfolio-block');
        

        portfolioDiv.addEventListener('click', handlePortfolioClick);
        optionsDiv.addEventListener('click', handleDeleteClick);

        root.appendChild(portfolioDiv);
        root.appendChild(optionsDiv);
        root.appendChild(br);
    })
})

/**
 * event listener
 */
function handlePortfolioClick() {
    // open up new window, with portfolio details
    ipcRenderer.send("showPortfolioWindow");
}

function handleDeleteClick(e) {
    // delete portfolio entry in folder and refresh window
    deletePortfolio(e);
}