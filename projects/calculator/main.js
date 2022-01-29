'use strict'

let divResult = document.getElementById('result')
let divInfos = document.getElementById('infos')

document.getElementById('+').addEventListener('click', e => { setOperation('add') })
document.getElementById('-').addEventListener('click', e => { setOperation('sus') })
document.getElementById('*').addEventListener('click', e => { setOperation('mul') })
document.getElementById('/').addEventListener('click', e => { setOperation('div') })

document.getElementById('1').addEventListener('click', e => { addEntry('1') })
document.getElementById('2').addEventListener('click', e => { addEntry('2') })
document.getElementById('3').addEventListener('click', e => { addEntry('3') })
document.getElementById('4').addEventListener('click', e => { addEntry('4') })
document.getElementById('5').addEventListener('click', e => { addEntry('5') })
document.getElementById('6').addEventListener('click', e => { addEntry('6') })
document.getElementById('7').addEventListener('click', e => { addEntry('7') })
document.getElementById('8').addEventListener('click', e => { addEntry('8') })
document.getElementById('9').addEventListener('click', e => { addEntry('9') })
document.getElementById('0').addEventListener('click', e => { addEntry('0') })
document.getElementById('.').addEventListener('click', e => { addEntry('.') })
document.getElementById('C').addEventListener('click', e => { resetEntry() })

document.getElementById('=').addEventListener('click', e => { enter() })

document.getElementById('delete').addEventListener('click', e => { remove() })

let display = ''
let op = ''
let stk = ''

function setOperation (newOperator) {
  op = newOperator
  stk = display
  display = ''

  divResult.innerHTML = display
  divInfos.innerHTML = ''
}

function addEntry (elem) {
  display = display + elem

  divResult.innerHTML = display
  divInfos.innerHTML = ''
}

function resetEntry () {
  display = op = stk = ''

  divResult.innerHTML = display
  divInfos.innerHTML = ''
}

function enter () {
  if (op === '' || stk === '')
    return

  op === 'add' && (display = String(Number(stk) + Number(display)))
  op === 'sus' && (display = String(Number(stk) - Number(display)))
  op === 'mul' && (display = String(Number(stk) * Number(display)))
  op === 'div' && (display = String(Number(stk) / Number(display)))

  stk = op = ''
  divResult.innerHTML = display

  navigator.clipboard.writeText(display)
  divInfos.innerHTML = 'Result copied to your clipboard !'
}

function remove () {
  display = display.slice(0, -1)

  divResult.innerHTML = display
}