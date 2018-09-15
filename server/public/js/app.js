/* eslint no-undef: 0 */

const toggle3dEl = document.querySelector('#toggle3d')
const toggleVerticalEl = document.querySelector('#toggleVertical')
const stadiumEl = document.querySelector('#stadium')
const playersEl = document.querySelector('#players')

const socket = io()

let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

const pitchRatio = 105 / 68

let pitchHeight
let pitchWidth

let verticalOrientation

let pitchView = {
  horizontal: true,
  threeD: false
}

let removeTimeout
let scaleTimeout

let ballEl = null

let game = null

async function createGame() {
  await startGame()

  game.state.kickOffTeam.name = game.state.kickOffTeam.name.toLowerCase()
  game.state.secondTeam.name = game.state.secondTeam.name.toLowerCase()

  createBall(game.state.ball)
  createPlayers(game.state.kickOffTeam)
  createPlayers(game.state.secondTeam)

  update()

  requestAnimationFrame(tick)
}

const tick = async() => {
  try {
    await iterate()
    update()
    requestAnimationFrame(tick)
  } catch (e) {
    console.log('Match ends.')
  }
}

async function startGame() {
  game = await emit('start game')
}

async function iterate() {
  game = await emit('iterate game')
}

async function emit(msg) {
  return new Promise((resolve, reject) => {
    socket.emit(msg, data => {
      if (!data) return reject()

      resolve(data)
    })
  })
}

function createPlayers(team) {
  team.players.forEach((p, i) => {
    const playerEl = createEl(playerTemplate(p, i, team))
    setElementPosition(playerEl, p.startPOS[1], p.startPOS[0])

    playersEl.appendChild(playerEl)
  })
}

function createBall(ball) {
  ballEl = createEl(ballTemplate())
  setElementPosition(ballEl, ball.position[1], ball.position[0])

  stadiumEl.appendChild(ballEl)
}

function playerTemplate(player, index, team) {
  return `<div class="player" id="${team.name}-player-${index}">
  <div class="player-card">
    <div class="icon ${team.name}"></div>
    <div class="name">${player.name}</div>
  </div>
</div>
`
}

function ballTemplate() {
  return `<div id="ball">
  <div class="shadow"></div>
  <div id="ball-icon"></div>
</div>
`
}

function update() {
  game.state.kickOffTeam.players.forEach(updatePlayerPosition.bind(null, 0))
  game.state.secondTeam.players.forEach(updatePlayerPosition.bind(null, 1))
  setElementPosition(ballEl, game.state.ball.position[1], game.state.ball.position[0], 20)
}

function updatePlayerPosition(team, player, index) {
  const playerEl = playersEl.children[team * 11 + index]
  setElementPosition(playerEl, player.startPOS[1], player.startPOS[0])
}

function setElementPosition(el, x = 0, y = 0, z = 0) {
  el.style.transform = `translate3d(${x / 20}em, ${y / 20}em, ${z}px)`
}

createGame()

const createEl = (function() {
  const container = document.createElement('div')

  return function(html) {
    container.innerHTML = html
    return container.firstChild
  }
}())

function toggle3d(force = !pitchView.threeD) {
  pitchView.threeD = force
  document.body.classList.toggle('threed', pitchView.threeD)
}

function toggleVertical(force = !pitchView.horizontal) {
  pitchView.horizontal = force

  document.body.classList.toggle('vertical', !pitchView.horizontal)
}

toggle3dEl.addEventListener('click', () => toggle3d())
toggleVerticalEl.addEventListener('click', () => toggleVertical())

function calculatePitchScale() {
  windowHeight = window.innerHeight
  windowWidth = window.innerWidth
  verticalOrientation = windowHeight / windowWidth > 1.1
  document.body.classList.toggle('portrait', verticalOrientation)

  pitchView.horizontal = !verticalOrientation
  toggleVertical(!verticalOrientation)

  if (pitchView.horizontal) {
    pitchHeight = windowWidth * 0.8
    pitchWidth = pitchHeight / pitchRatio

    if (pitchWidth > windowHeight * 0.7) {
      pitchWidth = windowHeight * 0.7
      pitchHeight = pitchWidth * pitchRatio
    }
  } else {
    pitchHeight = windowHeight * 0.8
    pitchWidth = pitchHeight / pitchRatio

    if (pitchWidth > windowWidth * 0.7) {
      pitchWidth = windowWidth * 0.7
      pitchHeight = pitchWidth * pitchRatio
    }
  }

  document.body.classList.add('freeze-animations')
  clearTimeout(scaleTimeout)
  clearTimeout(removeTimeout)

  stadiumEl.style.fontSize = `${pitchHeight / 52.5}px`
  removeTimeout = setTimeout(() => {
    document.body.classList.remove('freeze-animations')
  }, 300)
}

calculatePitchScale()

window.addEventListener('resize', calculatePitchScale)
