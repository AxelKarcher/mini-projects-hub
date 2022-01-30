'use strict'

let linksDiv = document.getElementById('links')
let infoPanelDiv = document.getElementById('infoPanel')

// mettre les infos dans un fichier json

let projectsDir = './projects/'
let projectsList = [
  { title: 'stopwatch', redirectPath: 'stopwatch/index.html', status: 'orange',
    info: 'Would be relevant with milliseconds' },
  { title: 'clock', redirectPath: 'clock/index.html', status: 'green',
    info: 'The simpliest thing ever' },
  { title: 'calculator', redirectPath: 'calculator/index.html', status: 'orange',
    info: 'Works well but could be more practical' },
  { title: 'drum-kit', redirectPath: 'drum-kit/index.html', status: 'green',
    info: 'I dubbed the sounds myself. Works well but the cooldown thing is annoying' },
  { title: 'guess-the-color', redirectPath: 'guess-the-color/index.html', status: 'green',
    info: 'So fun to do, very hard to win' },
  { title: 'hangman', redirectPath: 'hangman/index.html', status: 'green',
    info: 'Thanks to Simon Bredeche for the word giver API' },
  { title: 'tic-tac-toe', redirectPath: 'tic-tac-toe/index.html', status: 'orange',
    info: 'The IA is random but the purpose was the logic. I\'ll add the end game lines' },
  { title: 'pong', redirectPath: 'pong/index.html', status: 'red',
    info: 'Working on it' }
]

const redirectTo = (location) => { window.location.href = projectsDir + location }

projectsList.forEach(elem => {
  let newLink = document.createElement('div')

  elem.status === 'orange' && (newLink.style.color = '#E7A35A')
  elem.status === 'green' && (newLink.style.color = 'lightGreen')
  elem.status === 'red' && (newLink.style.color = '#E08686')

  newLink.onmouseover = () => {
    infoPanelDiv.innerHTML = elem.info
  }
  newLink.innerHTML = elem.title
  newLink.onclick = () => redirectTo(elem.redirectPath)
  linksDiv.appendChild(newLink)
})