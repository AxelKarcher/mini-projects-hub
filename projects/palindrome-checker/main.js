'use strict'

let userInput = document.getElementById('userInput')
let responseTextDiv = document.getElementById('responseText')

let userWord = ''
let compareString

const revStr = (oldStr) => {
  compareString = ''

  for (let i = oldStr.length - 1; i != -1; i--) {
    compareString += oldStr[i]
  }
  return (compareString === oldStr ? true : false)
}

const tryWord = () => {
  userWord = userInput.value
  if (userWord.length < 1) {
    responseTextDiv.innerHTML = 'Incorrect entry'
  } else {
    responseTextDiv.innerHTML =  (revStr(userWord) ? 'Palindrome !' : 'It\'not a palindrome..')
  }
}