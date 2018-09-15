const repl = require('repl')
const Game = require('./lib/game')

const brazil = JSON.stringify(require('./fixture/brazil.json'))
const germany = JSON.stringify(require('./fixture/germany.json'))

const r = repl.start('⚽️  > ')
require('repl.history')(r, `${process.env.HOME}/.node_repl_history`)

Object.defineProperty(r.context, 'game', {
  configurable: false,
  enumerable: true,
  value: new Game(brazil, germany)
})

r.defineCommand('start', async() => {
  const output = await r.context.game.start()
  console.log(`\n${output.iterationLog.join('\n')}\n`)
  r.displayPrompt()
})

r.defineCommand('iterate', async function iterate(iterationCount = 0) {
  const log = r.context.game.state.iterationLog.join('\n')
  const output = await r.context.game.iterate()
  const newLog = output.iterationLog.join('\n')
  if (newLog != log) {
    if (iterationCount) console.log(`\n${iterationCount} iterations passed without events`)
    console.log(`Ball is with ${r.context.game.state.ball.Player} from ${r.context.game.state.ball.withTeam}`)
    console.log(`\n${newLog}\n`)
  } else await iterate(++iterationCount)
  r.displayPrompt()
})

// async function main() {
//   await r.context.game.start()
//   await r.context.game.iterate() // this goes on for ever
//   await r.context.game.startSecondHalf()
//   await r.context.game.iterate() // this goes on for ever
// }

// main()
