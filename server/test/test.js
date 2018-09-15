import test from 'ava'
import Game from '../lib/game'
import Brazil from '../fixture/brazil.json'
import Germany from '../fixture/germany.json'

const brazil = JSON.stringify(Brazil)
const germany = JSON.stringify(Germany)

test.beforeEach(t => {
  t.context.game = new Game(brazil, germany)
})

test('start match', async t => {
  const state = await t.context.game.start()
  t.is(state.iterationLog.length, 2)
})

test('iterate', async t => {
  let state = await t.context.game.start()
  state = await t.context.game.iterate()
  t.is(state.iterationLog.length, 2)
})

test('start second half', async t => {
  let state = await t.context.game.start()
  state = await t.context.game.iterate()
  state = await t.context.game.startSecondHalf()
  t.is(state.iterationLog.length, 2)
})
