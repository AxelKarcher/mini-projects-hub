'use strict'

// route 5A/5B (ajouter 7s pour 5A tape) ? 6A/6B ?
// écrire que chaque temps doit faire max 9h
// petit son quand c'est prêt

let imageDiv = document.getElementById('imageDiv')
let image = document.getElementById('image')
let labelBtn = document.getElementById('labelBtn')
let infoTextDiv = document.getElementById('infoText')
let sobTextDiv = document.getElementById('sobText')
let prologueInput = document.getElementById('prologueInput')

let radio1Input = document.getElementById('radio1')
let radio2Input = document.getElementById('radio2')
let radio3Input = document.getElementById('radio3')

const parseKey = 'K87772827888957'

let readyArr = []
let sendingI
let sob = 0

let prologueBool = false
let prologueEntry = ''

let radio1Bool = true
let radio2Bool = false
let radio3Bool = false

const dataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

const calcSob = (times) => {
  let mil = 0, sec = 0, min = 0, hou = 0
  sob = 0

  times.forEach((time) => {
    mil = (mil + Number(time.substring(time.length - 3, time.length)))
    sec = (sec + Number(time.substring(time.length - 6, time.length - 4)))
    min = (min + Number(time.substring(time.length - 9, time.length - 7)))
    hou = (hou + Number(time.substring(time.length - 11, time.length - 10)))
  })
  sob = ((mil / 1000) + sec + (min * 60) + (hou * 3600)).toFixed(3)

  mil = String(sob).substring(sob.length - 4, sob.length)
  sob = Number(String(sob).substring(0, sob.length - 4))

  hou = String(Math.floor(sob / 3600))
  sob -= (hou * 3600)

  min = String(Math.floor(sob / 60))
  sec = String(sob - (min * 60))

  sec.length === 1 && (sec = '0' + sec)
  min.length === 1 && (min = '0' + min)

  sob = (hou + ':' + min + ':' + sec + mil)
  while (sob[0] === '0' || sob[0] === ':') {
    sob = sob.substring(1)
  }
  sobTextDiv.innerHTML = sob
  sobTextDiv.style.visibility = 'visible'
  infoTextDiv.innerHTML = 'Your SOB:'
}

const cleanRaw = (rawParse) => {
  let rawArr = rawParse.replaceAll(':', '').replaceAll('.', '')
    .replaceAll('o', '0').replaceAll('\r', '').replaceAll(' ', '').split('\n')
  let currentElem = ''

  rawArr.pop()

  clearInterval(sendingI)
  infoTextDiv.innerHTML = ''

  rawArr.forEach(elem => {
    currentElem = ''
    currentElem += ( elem[elem.length - 4] + '.' + elem.substring(elem.length - 3, elem.length))

    elem.length >= 5 && (currentElem = (elem[elem.length - 5] + currentElem))
    elem.length >= 6 && (currentElem = (elem[elem.length - 6] + ':' + currentElem))
    elem.length >= 7 && (currentElem = (elem[elem.length - 7] + currentElem))
    elem.length >= 8 && (currentElem = (elem[elem.length - 8] + ':' + currentElem))

    readyArr.push(currentElem)
  })
  calcSob(readyArr)
}

const sendToParse = (fileName, base64Image) => {
  const xhr = new XMLHttpRequest()
  const form = new FormData()

  infoTextDiv.innerHTML = 'Sending...'
  sendingI = setInterval(() => {
    if (infoTextDiv.innerHTML === 'Sending..') {
      infoTextDiv.innerHTML = 'Sending...'
    } else if (infoTextDiv.innerHTML === 'Sending...') {
      infoTextDiv.innerHTML = 'Sending.'
    } else if (infoTextDiv.innerHTML === 'Sending.') {
      infoTextDiv.innerHTML = 'Sending..'
    }
  }, 300)

  form.append('base64Image', dataURIToBlob(base64Image), fileName)

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      cleanRaw(JSON.parse(xhr.response).ParsedResults[0].ParsedText)
    }
  }
  xhr.open('POST', 'https://api.ocr.space/parse/image')
  xhr.setRequestHeader('apikey', parseKey)
  xhr.send(form)
}

const displayImage = (path) => {
  image.src = path
  imageDiv.style.visibility = 'visible'
}

const handleImage = (elem) => {
  let file = elem.files[0]
  let reader = new FileReader()

  if (file === undefined) { return }

  imageDiv.style.visibility = 'hidden'
  image.src = ''
  infoTextDiv.innerHTML = ''
  sobTextDiv.style.visibility = 'hidden'
  sobTextDiv.innerHTML = ''

  readyArr = []

  displayImage(file.name)
  new Promise((resolve, reject) => {
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
  .then((res) => sendToParse(file.name, res) )
}

const handleRadios = (radio) => {
  // console.log(radio1Input.checked)
  // console.log(radio2Input.checked)
  // console.log(radio3Input.checked)
  // console.log('==================')
  // switch(radio) {
  //   case 1:
  //     radio1Input.checked = true
  //     radio2Input.checked = false
  //     radio3Input.checked = false
  //     break;
  //   case 2:
  //     radio1Input.checked = false
  //     radio2Input.checked = true
  //     radio3Input.checked = false
  //     break;
  //   case 3:
  //     radio1Input.checked = false
  //     radio2Input.checked = false
  //     radio3Input.checked = true
  // }
}

const handlePrologueEntry = (e) => {
  if (e.value.length >= 7) {
    prologueInput.value = prologueEntry.substring(0, 6)
  }
  prologueInput.value = prologueInput.value.replaceAll(/[a-z]/g, '')
  prologueEntry = e.value
  if (sob === 0) { return }
  if (prologueBool && prologueEntry !== '') {
    readyArr[readyArr.length - 1] = prologueEntry
  }
  calcSob(readyArr)
}

const togglePrologue = () => {
  prologueBool = !prologueBool

  if (sob === 0) { return }

  if (prologueBool) {
    readyArr.push(prologueEntry)
    calcSob(readyArr)
  } else {
    readyArr.pop()
    calcSob(readyArr)
  }
}