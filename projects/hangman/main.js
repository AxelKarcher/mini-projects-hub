'use strict'

let appContainerDiv = document.getElementById('appContainer')
let wordDisplayerDiv = document.getElementById('wordDisplayer')
let livesDiv = document.getElementById('lives')

let currentWord = ''
let displayedWord = ''
let lives = 3

document.addEventListener('keydown', (event) => { handleTry(event.key) })

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length)
}

const animBg = (color) => {
  appContainerDiv.style = 'background-color:' + color
  setTimeout(() => {
    appContainerDiv.style = 'background-color: grey'
  }, 70)
}

const preRestart = (text) => {
  window.open('https://www.google.com/search?q=' + currentWord, '_blank')
  setTimeout(() => {
    alert(text)
    start()
  }, 100)
}

const handleTry = (key) => {
  if (key.length !== 1) {
    return
  }

  if (currentWord.indexOf(key) === -1 || displayedWord.indexOf(key) !== -1) {
    lives -= 1
    if (lives === 0) {
      preRestart('You lost ! The word was: ' + currentWord)
    }
    livesDiv.innerHTML = lives > 1 ? 'Vies restantes: ' + lives : 'Dernière vie'
    return animBg('darkred')
  }

  for (let i = 0; i !== currentWord.length; i++) {
    if (currentWord[i] === key) {
      displayedWord = displayedWord.replaceAt(i, key)
      animBg('darkgreen')
    }
  }
  wordDisplayerDiv.children[0].innerHTML = displayedWord
  if (displayedWord === currentWord) {
    preRestart('Well done !')
  }
}

const handleData = (res) => {
  currentWord = res
  displayedWord = new Array(currentWord.length + 1).join('_')

  let newCell = document.createElement('h2')
  newCell.innerHTML = displayedWord
  wordDisplayerDiv.append(newCell)
  lives = Math.floor(currentWord.length * 1.2)
  livesDiv.innerHTML = 'Vies restantes: ' + lives
}

const start = () => {
  currentWord, displayedWord, wordDisplayerDiv.innerHTML = ''

  let category = Math.floor(Math.random() * 3)
  let xhr = new XMLHttpRequest()
  let apiLink = ''

  category === 0 && (apiLink = 'http://152.228.139.203/api/randomWordApi.php?category=object&random&nb=1')
  category === 1 && (apiLink = 'http://152.228.139.203/api/randomWordApi.php?category=food&random&nb=1')
  category === 2 && (apiLink = 'http://152.228.139.203/api/randomWordApi.php?category=animals&random&nb=1')

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      handleData(JSON.parse(xhr.response)[0])
    }
  }

  xhr.open('GET', apiLink, true)
  xhr.send('')
}

start()