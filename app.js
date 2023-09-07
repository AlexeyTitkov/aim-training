const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')
const colors = ['#696969', '#556B2F', '#8B008B', '#2E8B57', '#A0522D', '#9932CC', '#8B4513', '#483D8B', '#5F9EA0', '#800000']
const shotSound = document.getElementById('shot-sound');
let time = 0
let selectedTime = 0
let intervalId;
let score = 0

function playShotSound() {
  shotSound.currentTime = 0;
  shotSound.play();
}

function togglePrimaryClass() {
  startBtn.classList.toggle('primary');
}

setInterval(togglePrimaryClass, 1000);

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
});

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
    return selectedTime = time
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    playShotSound();
    createRandomCircle()
  }
})

function startGame() {
  intervalId = setInterval(decreaseTime, 1000);
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
  board.innerHTML = `
     <h2>GAME OVER
      <br>
     Your score: <span class="primary">${score}</span></h2>
    <button class="btn try-again">TRY AGAIN</button>
    <br>
    <button class="btn reset"">RESET</button>`;
  gameOverScreenHandler()
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
  circle.style.boxShadow = `inset rgb(0 0 0 / 31%) 0 0 9px 2px`
  setColor(circle)
  

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
  const color = getRandomColor()
  element.style.backgroundColor = `${color}`
}

function getRandomColor() {
  const index = Math.floor(Math.random()  *  colors.length)
  return colors[index]
}


function gameOverScreenHandler() {
    const tryAgainBtn = document.querySelector('.try-again');
    const resetBtn = document.querySelector('.reset');

    tryAgainBtn.addEventListener('click', tryAgain);
    resetBtn.addEventListener('click', resetGame);
}

function tryAgain() {
  clearInterval(intervalId); // Очистка интервала
  screens[2].classList.remove('hide');
  time = selectedTime;
  score = 0;
  board.innerHTML = '';
  timeEl.parentNode.classList.remove('hide');
  startGame();
}

function resetGame() {
  clearInterval(intervalId); // Очистка интервала
  board.innerHTML = '';
  screens[2].classList.remove('hide');
  time = 0;
  score = 0;
  screens[0].classList.remove('up');
  screens[1].classList.remove('up');
  timeEl.parentNode.classList.remove('hide');
  board.innerHTML = '';
  setTime('00:00');
}
