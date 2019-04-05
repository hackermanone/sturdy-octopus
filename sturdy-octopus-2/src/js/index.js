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
    let root = document.getElementById('root'),
        div = document.createElement('div');
    files.forEach(file => {
        let portfolioDiv = document.createElement('div'),
            portfolioAttr = document.createAttribute("for"),
            text = document.createTextNode(file),
            br = document.createElement('br'),
            optionsDiv = document.createElement('div'),
            optionsText = document.createTextNode('Delete'),
            optionsAttr = document.createAttribute("for");

        optionsAttr.value = file;
        optionsDiv.setAttributeNode(optionsAttr);
        optionsDiv.appendChild(optionsText);
        optionsDiv.classList.add('portfolio-block-options');
        portfolioAttr.value = file;
        portfolioDiv.setAttributeNode(portfolioAttr);
        portfolioDiv.appendChild(text);
        portfolioDiv.classList.add('portfolio-block');
        

        portfolioDiv.addEventListener('click', handlePortfolioClick);
        optionsDiv.addEventListener('click', handleDeleteClick);

        div.appendChild(portfolioDiv);
        div.appendChild(optionsDiv);
        div.appendChild(br);
    })
    div.id = "wrapper";
    root.appendChild(div);
    
    let wrapperChild = root.getElementsByTagName('div')[0];
    //     console.log(wrapperChild);
    if (wrapperChild.innerHTML === "") {
        let shortcut = process.platform == 'darwin' ? 'Command' : 'Control';
        let text = document.createTextNode(`Hmm, you don't seem to have a profile created, Create one using using the shortcut ${shortcut} + G`);
        wrapperChild.appendChild(text)
    }
})

/**
 * event listener
 */
function handlePortfolioClick(e) {
    // open up new window, with portfolio details
    ipcRenderer.send("showPortfolioWindow", e.target.getAttribute("for"));
}

function handleDeleteClick(e) {
    // delete portfolio entry in folder and refresh window
    deletePortfolio(e);
}