'use strict'

let colorToGuessDiv = document.getElementById('colorToGuess')
let infosDiv = document.getElementById('infos')
let restartDiv = document.getElementById('restart')

let diffSelect = document.getElementById('diffSelect').addEventListener('change', e => { changediff(e) })
let restartBtn = restartDiv.addEventListener('click', e => { restart() })

let card1Div = document.getElementById('card1')
let card2Div = document.getElementById('card2')
let card3Div = document.getElementById('card3')
let card4Div = document.getElementById('card4')
let card5Div = document.getElementById('card5')
let card6Div = document.getElementById('card6')

card1Div.addEventListener('click', e => { attempt(1) })
card2Div.addEventListener('click', e => { attempt(2) })
card3Div.addEventListener('click', e => { attempt(3) })
card4Div.addEventListener('click', e => { attempt(4) })
card5Div.addEventListener('click', e => { attempt(5) })
card6Div.addEventListener('click', e => { attempt(6) })

let winR, winG, winB = 0
let diff = 'hard'
let winPos = 0
let lives = 2
let isGameFinished = false

function win () {
  isGameFinished = true
  infosDiv.innerHTML = 'You won !'
  restartDiv.style.display = ''
}

function lose () {
  isGameFinished = true
  infosDiv.innerHTML = 'You lose... The winning card was the n°' + winPos + ' !'
  restartDiv.style.display = ''
}

function attempt (nb) {
  if (isGameFinished === true)
    return

  if (winPos === nb)
    win()
  else {
    lives = lives - 1
    infosDiv.innerHTML = 'Lives left: ' + lives
    if (lives === -1)
      lose()
  }
}

function genHex () { return Math.floor(Math.random() * 256) }

function getNewWinPos () { winPos = Math.floor(Math.random() * (diff === 'easy' ? 3 : 6) + 1) }

function applyPosition () {
  winR = genHex()
  winG = genHex()
  winB = genHex()

  colorToGuessDiv.innerHTML = 'RGB(' + winR + ', ' + winG + ', ' + winB + ')'
  winPos === 1 && (card1Div.style.backgroundColor = 'rgb(' + winR + ',' + winG + ',' + winB + ')')
  winPos === 2 && (card1Div.style.backgroundColor = 'rgb(' + winR + ',' + winG + ',' + winB + ')')
  winPos === 3 && (card1Div.style.backgroundColor = 'rgb(' + winR + ',' + winG + ',' + winB + ')')
  winPos === 4 && (card1Div.style.backgroundColor = 'rgb(' + winR + ',' + winG + ',' + winB + ')')
  winPos === 5 && (card1Div.style.backgroundColor = 'rgb(' + winR + ',' + winG + ',' + winB + ')')
  winPos === 6 && (card1Div.style.backgroundColor = 'rgb(' + winR + ',' + winG + ',' + winB + ')')
}

function genColors () {
  card1Div.style.backgroundColor = 'rgb(' + genHex() + ',' + genHex() + ',' + genHex() + ')'
  card2Div.style.backgroundColor = 'rgb(' + genHex() + ',' + genHex() + ',' + genHex() + ')'
  card3Div.style.backgroundColor = 'rgb(' + genHex() + ',' + genHex() + ',' + genHex() + ')'
  diff === 'hard' && (card4Div.style.backgroundColor = 'rgb(' + genHex() + ',' + genHex() + ',' + genHex() + ')')
  diff === 'hard' && (card5Div.style.backgroundColor = 'rgb(' + genHex() + ',' + genHex() + ',' + genHex() + ')')
  diff === 'hard' && (card6Div.style.backgroundColor = 'rgb(' + genHex() + ',' + genHex() + ',' + genHex() + ')')

  getNewWinPos()
  applyPosition()
}

function changediff (e) {
  restart()
  diff = e.target.value

  lives = (diff === 'easy' ? 1 : 2)

  infosDiv.innerHTML = 'Lives left: ' + lives
  document.getElementById('hard').style.display = (diff === 'hard' ? '' : 'none')
  genColors()
}

function restart () {
  isGameFinished = false
  genColors()
  lives = (diff === 'easy' ? 1 : 2)
  restartDiv.style.display = 'none'
  infosDiv.innerHTML = 'Lives left: ' + lives
}

restart()

// mettre en avant la carte finale