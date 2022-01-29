'use strict'

const div = document.getElementsByTagName('time')[0]
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')

startBtn.addEventListener('click', e => { start() })
stopBtn.addEventListener('click', e => { stop() })
resetBtn.addEventListener('click', e => { reset() })

let seconds = 0
let minutes = 0
let hours = 0
let t
let last = ''

function tick () {
  seconds = seconds + 1

  if (seconds === 60) {
    seconds = 0
    minutes = minutes + 1
  }

  if (minutes === 60) {
    minutes = 0
    hours = hours + 1
  }
}

function add () {
  tick()
  div.textContent = (hours > 9 ? hours : '0' + hours)
    + ':' + (minutes > 9 ? minutes : '0' + minutes)
    + ':' + (seconds > 9 ? seconds : '0' + seconds)
  timer()
}

function timer () {
  t = setTimeout(add, 1000)
}

function start () {
  if (last == 'start')
    return

  timer()
  last = 'start'
  startBtn.innerHTML = 'Resume'
  startBtn.style.backgroundColor = ''
  stopBtn.style.backgroundColor = 'crimson'
  resetBtn.style.backgroundColor = 'lightblue'
}

function stop () {
  last = 'stop'
  clearTimeout(t)
  stopBtn.style.backgroundColor = ''
  startBtn.style.backgroundColor = 'lightgreen'
}

function reset () {
  div.textContent = '00:00:00'
  seconds = minutes = hours = 0

  if (last === 'stop') {
    startBtn.innerHTML = 'Start'
    resetBtn.style.backgroundColor = ''
  }
}

startBtn.style.backgroundColor = 'lightgreen'