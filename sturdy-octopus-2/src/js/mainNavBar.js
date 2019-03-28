const electron = require('electron');
const remote = electron.remote;
const { app } = remote; 
const { ipcRenderer } = electron;
const path = require('path');
const fs = require('fs');
const appHelper = require('./appHelper')
let nav = document.querySelector('nav');

// build navigation
let ul, li, text;
ul = document.createElement("ul");
ul.classList.add("container");


// add profile
li = document.createElement("li");
text = document.createTextNode("Add Portfolio");
li.appendChild(text);
ul.appendChild(li);
li.addEventListener('click', appHelper.addPortfolio);


nav.appendChild(ul);

// exit
li = document.createElement("li");
text = document.createTextNode("\u2716");
li.classList.add("ml-auto")
li.classList.add("hover-red")
li.appendChild(text);
li.addEventListener('click', appHelper.close)

nav.appendChild(li);
