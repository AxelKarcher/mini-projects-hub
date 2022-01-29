'use strict'

let hihatSound = new Audio('assets/hihat.mp3')
let crashSound = new Audio('assets/crash.mp3')
let rideSound = new Audio('assets/ride.mp3')
let snareSound = new Audio('assets/snare.mp3')
let kickSound = new Audio('assets/kick.mp3')
let tom1Sound = new Audio('assets/tom1.mp3')
let tom2Sound = new Audio('assets/tom2.mp3')
let tom3Sound = new Audio('assets/tom3.mp3')

let hihatBtn = document.getElementById('hihat').addEventListener('click', () => play('hihat'))
let crashBtn = document.getElementById('crash').addEventListener('click', () => play('crash'))
let rideBtn = document.getElementById('ride').addEventListener('click', () => play('ride'))
let snareBtn = document.getElementById('snare').addEventListener('click', () => play('snare'))
let kickBtn = document.getElementById('kick').addEventListener('click', () => play('kick'))
let tom1Btn = document.getElementById('tom1').addEventListener('click', () => play('tom1'))
let tom2Btn = document.getElementById('tom2').addEventListener('click', () => play('tom2'))
let tom3Btn = document.getElementById('tom3').addEventListener('click', () => play('tom3'))

let hihatBind = document.getElementById('hihatBind').addEventListener('click', () => rebind('hihat'))
let crashBind = document.getElementById('crashBind').addEventListener('click', () => rebind('crash'))
let rideBind = document.getElementById('rideBind').addEventListener('click', () => rebind('ride'))
let snareBind = document.getElementById('snareBind').addEventListener('click', () => rebind('snare'))
let kickBind = document.getElementById('kickBind').addEventListener('click', () => rebind('kick'))
let tom1Bind = document.getElementById('tom1Bind').addEventListener('click', () => rebind('tom1'))
let tom2Bind = document.getElementById('tom2Bind').addEventListener('click', () => rebind('tom2'))
let tom3Bind = document.getElementById('tom3Bind').addEventListener('click', () => rebind('tom3'))

let resetBtn = document.getElementById('reset').addEventListener('click', () => reset())
let infosDiv = document.getElementById('infos')

let rebinding = ''
const instruArray = ['hihat', 'crash', 'ride', 'snare', 'kick', 'tom1', 'tom2', 'tom3']
const defaultBinds = ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I']
let currentBinds = defaultBinds.slice()

document.addEventListener('keydown', (event) => {
  if (rebinding !== '')
    change(event.key)

  event.key === document.getElementById('hihat').innerHTML.toLowerCase() && play('hihat')
  event.key === document.getElementById('crash').innerHTML.toLowerCase() && play('crash')
  event.key === document.getElementById('ride').innerHTML.toLowerCase() && play('ride')
  event.key === document.getElementById('snare').innerHTML.toLowerCase() && play('snare')
  event.key === document.getElementById('kick').innerHTML.toLowerCase() && play('kick')
  event.key === document.getElementById('tom1').innerHTML.toLowerCase() && play('tom1')
  event.key === document.getElementById('tom2').innerHTML.toLowerCase() && play('tom2')
  event.key === document.getElementById('tom3').innerHTML.toLowerCase() && play('tom3')
})

function play (instru) {
  if (rebinding !== '')
    return

  instru === 'hihat' && hihatSound.play()
  instru === 'crash' && crashSound.play()
  instru === 'ride' && rideSound.play()
  instru === 'snare' && snareSound.play()
  instru === 'kick' && kickSound.play()
  instru === 'tom1' && tom1Sound.play()
  instru === 'tom2' && tom2Sound.play()
  instru === 'tom3' && tom3Sound.play()
}

function rebind (instru) {
  if (rebinding !== '')
    return

  rebinding = instru
  document.getElementById(instru).innerHTML = '...',
  document.getElementById(instru + 'Bind').innerHTML = '...'
}

function change (newKey) {
  for (let elem of currentBinds) {
    if (newKey.toUpperCase() === elem) {
      infosDiv.innerHTML = 'Key already taken !'
      return
    }
  }

  for (let i = 0; instruArray[i]; i++) {
    if (rebinding === instruArray[i]) {
      currentBinds[i] = newKey.toUpperCase()
      break
    }
  }

  infosDiv.innerHTML = ''
  document.getElementById(rebinding).innerHTML = newKey.toUpperCase(),
  document.getElementById(rebinding + 'Bind').innerHTML = newKey.toUpperCase()
  rebinding = ''
}

function reset () {

  let i = 0

  for (let elem of instruArray) {
    document.getElementById(elem).innerHTML = defaultBinds[i],
    document.getElementById(elem + 'Bind').innerHTML = defaultBinds[i]
    i = i + 1
  }
  currentBinds = defaultBinds.slice()
}

reset()