'use strict'

// mode 2 joueurs

let playGridDiv = document.getElementById('playGrid')
let infoTextDiv = document.getElementById('infoText')
let restartBtnDiv = document.getElementById('restartBtn')

let isUserTurn
let isFirstTurn = true
let isWaitingForUser = false
let tookCases = []
let probs = [
  [0, 1, 2], [3, 4, 5],
  [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

const newGame = () => {
  [...playGridDiv.children].forEach((card) => {
    card.style.backgroundColor = 'lightblue'
  })

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

const gameEnd = (type, case1, case2, case3) => {
  restartBtnDiv.style.visibility = 'visible'
  if (type === 'draw') {
    setText('Draw match !')
  } else {
    playGridDiv.children[case1].style.backgroundColor = 'salmon'
    playGridDiv.children[case2].style.backgroundColor = 'salmon'
    playGridDiv.children[case3].style.backgroundColor = 'salmon'
    setText(isUserTurn ? 'You won !' : 'The IA won !')
  }
}

const atPos = (index) => { return playGridDiv.children[index].innerHTML }

const setText = (text) => { infoTextDiv.innerHTML = text }

const checkGrid = () => {
  if (tookCases.length >= 5) {
    for (let i = 0; i != 8; i++) {
      if ((atPos(probs[i][0]) !== '') && (atPos(probs[i][0])) === atPos(probs[i][1])
      && (atPos(probs[i][1])) === atPos(probs[i][2])) {
        return gameEnd('', probs[i][0], probs[i][1], probs[i][2])
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