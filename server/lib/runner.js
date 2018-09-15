const brazil = JSON.stringify(require('../fixture/brazil.json'))
const germany = JSON.stringify(require('../fixture/germany.json'))

const Game = require('./game')

let activeGame = null

async function start() {
  activeGame = new Game(brazil, germany)

  await activeGame.start()

  return getActiveGame()
}

async function iterate() {
  if (!activeGame) throw new Error('No active game')

  await activeGame.iterate()

  if (activeGame.iterations == Math.floor(activeGame.matchLength / 2)) {
    await startSecondHalf()
  } else if (activeGame.iterations == activeGame.matchLength) {
    await endActiveGame()
  }

  return getActiveGame()
}

async function getState() {
  if (!activeGame) throw new Error('No active game')

  return activeGame.state
}

async function getActiveGame() {
  return activeGame
}

async function startSecondHalf() {
  if (!activeGame) throw new Error('No active game')

  return activeGame.startSecondHalf()
}

async function endActiveGame() {
  activeGame = null
}

module.exports = {
  getActiveGame,
  getState,
  iterate,
  startSecondHalf,
  start
}
