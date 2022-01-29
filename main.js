'use strict'

let linksDiv = document.getElementById('links')

let projectsDir = './projects/'
let projectsList = [
  { title: "stopwatch", redirectPath: "stopwatch/index.html" },
  { title: "clock", redirectPath: "clock/index.html" },
  { title: "calculator", redirectPath: "calculator/index.html" },
  { title: "drum-kit", redirectPath: "drum-kit/index.html" },
  { title: "guess-the-color", redirectPath: "guess-the-color/index.html" },
  { title: "hangman", redirectPath: "hangman/index.html" },
  { title: "tic-tac-toe", redirectPath: "tic-tac-toe/index.html" }
]

const redirectTo = (location) => { window.location.href = projectsDir + location }

projectsList.forEach(elem => {
  let newLink = document.createElement('h1')

  newLink.innerHTML = elem.title
  newLink.onclick = () => redirectTo(elem.redirectPath)
  linksDiv.appendChild(newLink)
})