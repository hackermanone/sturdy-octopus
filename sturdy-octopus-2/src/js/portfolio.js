const electron = require('electron');
const remote = electron.remote;
const { app } = remote; 
const { ipcRenderer } = electron;
const path = require('path');
const fs = require('fs');
const { addNote } = require("./fileHelper");
const { closeWindow } = require("./appHelper");

let user = remote.getGlobal('currUser');
let desktopPath = app.getPath('desktop');
let portfoliosPath = path.join(desktopPath, process.env.PROJECT_NAME, 'portfolio');
let userPortfolio;
let notes = document.querySelector("#notes");
let form = document.querySelector("#form");

let fileTitles = [];
let button = document.getElementById("exit");

if (user) {
    console.log(user);
    renderNotes(user);
    form.addEventListener('keypress', handleSubmitNote);
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    closeWindow();
})

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

function handleSubmitNote(e) {
    // keycode 13 === enter key
    if (e.keyCode == 13) {
        e.preventDefault();
        //array with first element as form title, and second element as form body
        let formData = form.elements; 
        addNote(userPortfolio, formData[0].value, formData[1].value);
        form.reset();
        formData[0].focus();
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
    let div, note, wrapper, divAttr, span;
    wrapper = document.createElement("div");
    wrapper.classList.add("hider");
    // title of wrapper
    span = document.createElement("span");
    span.classList.add("bold");
    span.innerHTML = name;
    wrapper.appendChild(span);
    // wrapper hidden body
    divAttr = document.createAttribute("name");
    fileTitles.push(name);
    divAttr.value = name;
    div = document.createElement('div');
    div.classList.add("invisible");
    div.setAttributeNode(divAttr);
    note = document.createTextNode(noteData);
    div.appendChild(note);
    div.classList.add("hider-content")
    wrapper.appendChild(div);
    notes.appendChild(wrapper);

    wrapper.addEventListener('click', handleClick);
}

/**
 * expands div if user clicks on the wrapper
 * @param {Event} e 
 */
function handleClick(e) {
    let div;
    console.log(e.target);
    // span
    if (e.target.tagName.toLowerCase() === 'span') {
        div = e.target.parentNode.children[1];
    //wrapper div
    } else if (e.target.classList.contains('hider')) {
        div = e.target.children[1];
    }

    if (div) {
        div.classList.contains("invisible") ? div.classList.remove("invisible") : div.classList.add("invisible");
    }
}