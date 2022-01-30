'use strict'

window.onload = init

let round = document.getElementById('round')
let leftScoreDiv = document.getElementById('leftScore')
let rightScoreDiv = document.getElementById('rightScore')

document.addEventListener('keydown', (e) => manageInputs(e.key))
document.addEventListener('keyup', () => stopMoving())

let canvas, ctx, rectH, rectW, leftRectX, leftRectY,
  rightRectX, rightRectY, stkLeftRectX, stkLeftRectY,
  stkRightRectX, stkRightRectY, direction, target
let movingTimeout = -1
let roundNb = 1
let ballSpeed = 10

function manageInputs(key) {
  if (key === 'a' || key === 'q' ||
  key === 'ArrowUp' || key === 'ArrowDown') {
    target = ''
    switch(key) {
      case 'a':
        target = 'left'
        direction = 'up'
        break
      case 'q':
        target = 'left'
        direction = 'down'
        break
      case 'ArrowUp':
        target = 'right'
        direction = 'up'
        break
      case 'ArrowDown':
        target = 'right'
        direction = 'down'
    }
    startMoving()
  }
}

function stopMoving() {
  clearTimeout(movingTimeout)
  movingTimeout = -1
}

function startMoving() {
  if (movingTimeout === -1) {
    movingLoop(direction)
  }
}

function movingLoop() {
  if (target === 'right') {
    direction === 'up' ?
    rightRectY - 10 >= 5 && (rightRectY -= 10) :
    rightRectY + 10 <= 485 && (rightRectY += 10)
  } else {
    direction === 'up' ?
    leftRectY - 10 >= 5 && (leftRectY -= 10) :
    leftRectY + 10 <= 485 && (leftRectY += 10)
  }

  movingTimeout = setTimeout(movingLoop, 10, direction)
}

function draw() {
  if (canvas.getContext) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'black'
    ctx.fillRect(leftRectX, leftRectY, rectW, rectH)
    ctx.fillRect(rightRectX, rightRectY, rectW, rectH)

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 8, 0, 2 * Math.PI, false)
    ctx.fill()

    ctx.beginPath()
    ctx.setLineDash([10, 15])
    ctx.moveTo(canvas.width / 2, canvas.height)
    ctx.lineTo(canvas.width / 2, 0)
    ctx.stroke()
  }
}

function gameLoop() {
  draw()
  window.requestAnimationFrame(gameLoop)
}

function init() {
  round.innerHTML = 'Round ' + roundNb
  leftScoreDiv.innerHTML = '0'
  rightScoreDiv.innerHTML = '0'

  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  rectH = 90
  rectW = 15

  leftRectX = 50
  leftRectY = canvas.height / 2 - 25
  rightRectX = canvas.width - 50 - 25 / 2
  rightRectY = canvas.height / 2 - 25

  stkLeftRectX = 50
  stkLeftRectY = canvas.height / 2 - 25
  stkRightRectX = canvas.width - 50 - 25 / 2
  stkRightRectY = canvas.height / 2 - 25

  window.requestAnimationFrame(gameLoop)
}