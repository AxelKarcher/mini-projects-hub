'use strict'

const dateDiv = document.getElementById('date')
const timeDiv = document.getElementById('time')

let currentTime

function getRealDate () {
  return (
    (currentTime.getDate() > 9 ? currentTime.getDate() : ('0' + currentTime.getDate()))
    + '/' +
    ((currentTime.getMonth() + 1) > 9 ? (currentTime.getMonth() + 1): ('0' + (currentTime.getMonth() + 1)))
     + '/' +
    currentTime.getFullYear()
  )
}

function getRealTime () {
  return (
    (currentTime.getHours() > 9 ? currentTime.getHours() : ('0' + currentTime.getHours()))
    + ':' +
    (currentTime.getMinutes() > 9 ? currentTime.getMinutes() : ('0' + currentTime.getMinutes()))
    + ':' +
    (currentTime.getSeconds() > 9 ? currentTime.getSeconds() : ('0' + currentTime.getSeconds()))
  )
}

function getNewTime () {
  currentTime = new Date()

  dateDiv.innerHTML = getRealDate()
  timeDiv.innerHTML = getRealTime()
}

setInterval(getNewTime, 1000)
