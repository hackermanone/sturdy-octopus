const electron = require('electron');
const remote = electron.remote;
const appHelper = require('./appHelper')
let nav = document.querySelector('nav');

// build navigation
let ul, li, text;
ul = document.createElement("ul");
ul.classList.add("container");

// add profile
li = document.createElement("li");
text = document.createTextNode(":)");
li.appendChild(text);
ul.appendChild(li);

nav.appendChild(ul);

// exit
li = document.createElement("li");
text = document.createTextNode("\u2716");
li.classList.add("ml-auto")
li.classList.add("hover-red")
li.appendChild(text);
li.addEventListener('click', appHelper.closeWindow)

nav.appendChild(li);
