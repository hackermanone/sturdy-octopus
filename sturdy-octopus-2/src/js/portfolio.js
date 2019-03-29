const electron = require('electron');
const remote = electron.remote;
const { app } = remote; 
const { ipcRenderer } = electron;
const path = require('path');
const fs = require('fs');
const { addNote } = require("./fileHelper");

let user;
let desktopPath = app.getPath('desktop');
let portfoliosPath = path.join(desktopPath, process.env.PROJECT_NAME, 'portfolio');
let userPortfolio;
let notes = document.querySelector("#notes");
let form = document.querySelector("#form");

let fileTitles = [];

function renderNotes(portfolioName) {
    userPortfolio = path.join(portfoliosPath, portfolioName);
    fs.readdir(userPortfolio, (err, files) => {
        if (err) throw err;
        files.forEach((file, index) => {
            let filePath = path.join(userPortfolio, file);
            fs.readFile(filePath, (err, data) => {
                if (err) throw err;
                renderNote(file, data)
            })
        })
    })
}

ipcRenderer.once("render:notes", (e, name) => {
    user = name;
    renderNotes(name);
    form.addEventListener('keypress', handleSubmitNote);
})

function handleSubmitNote(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        let formData = form.elements;
        addNote(userPortfolio, formData[0].value, formData[1].value);
        form.reset();
        refreshNotes();
    }
}

/**
 * Compares fs files to the ones currently rendered, if there is a difference, the new notes will be rendered
 */
function refreshNotes() {
    fs.readdir(userPortfolio, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            if (!fileTitles.includes(file)) {
                fs.readFile(path.join(userPortfolio, file), (err, data) => {
                    if (err) throw err;
                    renderNote(file, data)
                }) 
            }
        })
    })
}

/**
 * 
 * @param {string} name same value as file
 * @param {string} noteData 
 */
function renderNote(name, noteData) {
    let div, note, wrapper, divAttr;
    wrapper = document.createElement("div");
    wrapper.classList.add("hider");
    wrapper.innerHTML = name;
    divAttr = document.createAttribute("name");
    fileTitles.push(name);
    divAttr.value = name;
    div = document.createElement('div');
    div.classList.add("invisible");
    div.setAttributeNode(divAttr);
    note = document.createTextNode(noteData);
    div.appendChild(note);
    wrapper.appendChild(div);
    notes.appendChild(wrapper);
}