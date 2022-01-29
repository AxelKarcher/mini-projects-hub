'use strict'

let playGridDiv = document.getElementById('playGrid')
let infoTextDiv = document.getElementById('infoText')
let restartBtnDiv = document.getElementById('restartBtn')

let isUserTurn
let isFirstTurn = true
let isWaitingForUser = false
let tookCases = []

const newGame = () => {
  restartBtnDiv.style.visibility = 'hidden'
  playGridDiv.childNodes.forEach(elem => {
    console.log(elem)
    elem.innerHTML = ''
  })
  isFirstTurn = true
  isWaitingForUser = false
  tookCases = []
  chooseRandomTurn()
}

const newTurn = () => {
  isUserTurn = !isUserTurn
  if (!isUserTurn) {
    iaTurn()
  } else {
    isWaitingForUser = true
  }
}

const checkGrid = () => {
  if (tookCases.length === 9) {
    restartBtnDiv.style.visibility = 'visible'
    infoTextDiv.innerHTML = 'Draw match !'
  } else {
    newTurn()
    updateInfoText()
  }
  // si win ou lose
}

const iaTurn = () => {
  let iaPlay = null

  while (1) {
    iaPlay = Math.floor(Math.random() * 9)
    if (!tookCases.includes(iaPlay)) {
      playGridDiv.children[iaPlay].innerHTML = 'O'
      break
    }
  }
  tookCases.push(iaPlay)
  checkGrid()
}

const handleUserClick = (nb) => {
  if (!isWaitingForUser || tookCases.includes(nb)) {
    return
  }
  if (!isFirstTurn && infoTextDiv.innerHTML.indexOf('Fate has decided who begins. ') !== -1) {
    infoTextDiv.innerHTML = infoTextDiv.innerHTML.substring(29, infoTextDiv.innerHTML.length)
  }
  isWaitingForUser = false
  tookCases.push(nb)
  playGridDiv.children[nb].innerHTML = 'X'
  checkGrid()
}

const updateInfoText = () => {
  if (isFirstTurn == true) {
    isFirstTurn = false
    infoTextDiv.innerHTML = 'Fate has decided who begins. '
    if (isUserTurn) {
      infoTextDiv.innerHTML += 'It\'s your turn !'
    } else {
      infoTextDiv.innerHTML += 'It\'s the IA turn !'
    }
  } else {
    if (isUserTurn) {
      infoTextDiv.innerHTML = 'The IA played. It\'s your turn !'
    } else {
      infoTextDiv.innerHTML = 'It\'s the IA turn !'
    }
  }
}

const chooseRandomTurn = () => {
  isUserTurn = Math.floor(Math.random() * 2) == 0 ? true : false
  isUserTurn == true ? isWaitingForUser = true : iaTurn()
  updateInfoText()
}

const setupBoard = () => {
  for (let i = 0; i != 9; i++) {
    let newCase = document.createElement('div')

    newCase.onclick = () => handleUserClick(i)
    newCase.className = 'gridCase'
    playGridDiv.append(newCase)
  }
  chooseRandomTurn()
}

setupBoard()