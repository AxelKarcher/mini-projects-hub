'use strict'

let divResult = document.getElementById('result')
let divInfos = document.getElementById('infos')
let currentEntry = ''

const setupArr = [
  '+', '-', '*', '/',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
]

const addEntry = (newEntry) => {
  currentEntry += newEntry
  divResult.innerHTML = currentEntry
}

const resetEntry = () => { currentEntry, divResult.innerHTML, divInfos.innerHTML = '' }

const enter = () => {
  if (currentEntry === '') { return }

  currentEntry = eval(currentEntry)
  divResult.innerHTML = currentEntry
  navigator.clipboard.writeText(currentEntry)

  divInfos.innerHTML = 'Result copied to your clipboard !'
}

const remove = () => {
  currentEntry = currentEntry.slice(0, -1)

  divResult.innerHTML = currentEntry
}

const setupBtns = () => {
  setupArr.forEach((elem) => {
    document.getElementById(elem).addEventListener('click', e => { addEntry(elem) })
  })
}

setupBtns()