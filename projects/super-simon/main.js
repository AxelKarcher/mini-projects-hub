'use strict'

let bottomBtn = document.getElementById('bottomBtn')
bottomBtn.addEventListener('click', () => bottomBtnClick())

let redCardDiv = document.getElementById('redCard')
let greenCardDiv = document.getElementById('greenCard')
let blueCardDiv = document.getElementById('blueCard')
let yellowCardDiv = document.getElementById('yellowCard')

let topTextDiv = document.getElementById('topText')
let bottomTextDiv = document.getElementById('bottomText')

let errorSound = document.getElementById('errorSound')
let clickSound = document.getElementById('clickSound')

let responses = []
let guesses = []
let isPlayerTurn = false
let currentActivateIndex
let playResponsesI
let isLost = false

const getNewEntry = () => {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case 2:
      return 'blue'
    case 3:
      return 'yellow'
  }
}

const activateColor = (color) => {
  clickSound.play()
  color === 'red' && (redCardDiv.style.background = 'rgb(255, 150, 150)')
  color === 'green' && (greenCardDiv.style.background = 'rgb(150, 255, 150)')
  color === 'blue' && (blueCardDiv.style.background = 'rgb(150, 150, 255)')
  color === 'yellow' && (yellowCardDiv.style.background = 'rgb(255, 255, 150)')

  setTimeout(() => {
    redCardDiv.style.background = 'rgb(255, 0, 0)'
    greenCardDiv.style.background = 'rgb(0, 255, 0)'
    blueCardDiv.style.background = 'rgb(0, 0, 255)'
    yellowCardDiv.style.background = 'rgb(255, 255, 0)'
  }, 200)

  if (currentActivateIndex === responses.length - 1) {
    clearInterval(playResponsesI)
    currentActivateIndex = 0
    if (!isLost) {
      isPlayerTurn = true
    }
  } else {
    currentActivateIndex += 1
  }
}

const playResponses = () => {
  currentActivateIndex = 0
  setTimeout(() => {
    playResponsesI = setInterval(() => {
      activateColor(responses[currentActivateIndex])
    }, 800)
  }, 300)
}

const lose = (index) => {
  isLost = true
  isPlayerTurn = false
  errorSound.play()
  bottomTextDiv.innerHTML = 'Wrong ! It was ' + responses[index] + '..'
  playResponses()
}

const cardClick = (clickedCard) => {
  if (!isPlayerTurn) { return }

  guesses.push(clickedCard)
  activateColor(clickedCard)

  for (let i = 0; i != guesses.length; i++) {
    if (guesses[i] != responses[i]) {
      return lose(i)
    }
  }
  if (guesses.length === responses.length) {
    topTextDiv.innerHTML = 'Score: ' + responses.length
    isPlayerTurn = false
    guesses = []
    responses.push(getNewEntry())
    playResponses()
  }
}

const newGame = () => {
  isLost = false
  responses = []
  isPlayerTurn = false
  bottomTextDiv.innerHTML = ''
  topTextDiv.innerHTML = 'Score: ' + responses.length
  guesses = []
  responses.push(getNewEntry())
  playResponses()
}

const bottomBtnClick = () => { newGame() }