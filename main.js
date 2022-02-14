'use strict'

let linksDiv = document.getElementById('links')
let infoPanelDiv = document.getElementById('infoPanel')

let dirPath = './projects/'

const redirectTo = (location) => { window.location.href = dirPath + location }

const initInfos = (data) => {
  data.forEach(elem => {
    let newLink = document.createElement('div')

    elem.status === 'orange' && (newLink.style.color = '#E7A35A')
    elem.status === 'green' && (newLink.style.color = 'lightGreen')
    elem.status === 'red' && (newLink.style.color = '#E08686')

    newLink.onmouseover = () => {
      infoPanelDiv.innerHTML = elem.info
    }
    newLink.innerHTML = elem.title
    newLink.onclick = () => redirectTo(elem.title + '/index.html')
    linksDiv.appendChild(newLink)
  })
}

const getProjects = () => {
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      initInfos(JSON.parse(xhr.response))
    }
  }
  xhr.open('GET', './infos.json', true)
  xhr.send('')
}

getProjects()