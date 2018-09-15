const engine = require('footballsimulationengine')

const DEFAULT_MATCH_LENGTH = 10000

class Game {
  constructor(homeTeam, awayTeam, matchLength = DEFAULT_MATCH_LENGTH) {
    this.homeTeam = homeTeam
    this.awayTeam = awayTeam

    this.iterations = 0

    this.matchLength = matchLength

    this.pitch = {
      pitchWidth: 300,
      pitchHeight: 450
    }

    this.state = null
  }
  async start() {
    this.state = await engine.initiateGame(this.homeTeam, this.awayTeam, this.pitch)

    return this.state
  }
  async iterate() {
    if (this.iterations < this.matchLength) {
      this.iterations++
      this.state = await engine.playIteration(this.state)
    }

    return this.state
  }

  async startSecondHalf() {
    this.state = await engine.startSecondHalf(this.state)

    return this.state
  }
}

module.exports = Game
