'use strict'

// afficher ligne gagnante

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

const gameEnd = (type) => {
  restartBtnDiv.style.visibility = 'visible'
  if (type === 'draw') {
    setText('Draw match !')
  } else {
    setText(isUserTurn ? 'You won !' : 'The IA won !')
  }
}

const atPos = (index) => { return playGridDiv.children[index].innerHTML }

const setText = (text) => { infoTextDiv.innerHTML = text }

const checkGrid = () => {
  let case1 = 0
  let case2 = 0
  let case3 = 0

  if (tookCases.length >= 5) {
    for (let i = 0; i != 8; i++) {
      switch(i) {
        case 0:
          case1 = 0; case2 = 1; case3 = 2
          break;
        case 1:
          case1 = 3; case2 = 4; case3 = 5
          break;
        case 2:
          case1 = 6; case2 = 7; case3 = 8
          break;
        case 3:
          case1 = 0; case2 = 3; case3 = 6
          break;
        case 4:
          case1 = 1; case2 = 4; case3 = 7
          break;
        case 5:
          case1 = 2; case2 = 5; case3 = 8
          break;
        case 6:
          case1 = 0; case2 = 4; case3 = 8
          break;
        case 7:
          case1 = 2; case2 = 4; case3 = 6
      }
      if ((atPos(case1) !== '') && (atPos(case1)) === atPos(case2) && (atPos(case2)) === atPos(case3)) {
        return gameEnd()
      }
    }
    if (tookCases.length === 9) {
      return gameEnd('draw')
    }
  }
  newTurn()
  updateInfoText()
}

const iaTurn = () => {
  let iaPlay = null

  while (1) {
    iaPlay = Math.floor(Math.random() * 9)
    if (!tookCases.includes(iaPlay)) {
      break
    }
  }
  playGridDiv.children[iaPlay].innerHTML = 'O'
  tookCases.push(iaPlay)
  checkGrid()
}

const handleUserClick = (nb) => {
  if (!isWaitingForUser || tookCases.includes(nb)) {
    return
  }
  if (!isFirstTurn) {
    setText('The IA played. It\'s your turn !')
  }
  isWaitingForUser = false
  tookCases.push(nb)
  playGridDiv.children[nb].innerHTML = 'X'
  checkGrid()
}

const updateInfoText = () => {
  if (isFirstTurn) {
    isFirstTurn = false
    setText('Fate has decided who begins. It\'s your turn !')
  } else {
    if (isUserTurn) {
      setText('The IA played. It\'s your turn !')
    }
  }
}

const chooseRandomTurn = () => {
  isUserTurn = Math.floor(Math.random() * 2) === 0 ? true : false
  updateInfoText()
  if (isUserTurn) {
    isWaitingForUser = true
  } else {
    iaTurn()
  }
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