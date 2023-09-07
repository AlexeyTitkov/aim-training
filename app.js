const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')
colors = ['#696969', '#556B2F', '#8B008B', '#2E8B57', '#A0522D', '#9932CC', '#8B4513', '#483D8B', '#5F9EA0', '#800000']
let time = 0
let score = 0
startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let currentTime = --time
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    setTime(currentTime)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Your score: <scan class="primary">${score}</scan></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 50)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${x}px`
  circle.style.left = `${y}px`
  circle.style.background = `linear-gradient(90deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}