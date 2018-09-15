<script>
import {mapActions, mapState} from 'vuex'

export default {
  methods: {
    ...mapActions(['toggle3d', 'toggleVertical', 'iterateGame', 'clearLogs', 'togglePause']),
    play () {
      this.togglePause()
    },
    fastForward (iterations = 10) {
      this.togglePause(true)
      this.iterateGame(iterations)
    }
  },
  created () {
    window.toggle = () => this.toggle3d()
  },
  computed: {
    ...mapState({
      score: state => state.game.state && `${state.game.state.kickOffTeam.name} ${state.game.state.kickOffTeamStatistics.goals} - ${state.game.state.secondTeamStatistics.goals} ${state.game.state.secondTeam.name}`,
      logs: state => state.logs,
      iterations: state => state.game.iterations,
      paused: state => state.paused,
      threeD: state => state.sizes.pitchView.threeD,
      horizontal: state => state.sizes.pitchView.horizontal
    })
  },
  data () {
    return {
      showLog: false
    }
  }
}
</script>

<template lang="pug">
  #control-panel
    .button#toggle3d(@click='toggle3d') {{ threeD ? '2D' : '3D' }}
    .button#toggleVertical(@click='toggleVertical') {{ horizontal ? 'Vertical' : 'Horizontal' }}
    .button#iterate(@click='play') {{ paused ? '►' : '❚❚' }}
    .button#iterate(@click='() => fastForward(1)') ►❚
    .button#iterate(@click='() => fastForward(10)') ►❚ ✕ 10
    .button#iterate(@click='() => fastForward(100)') ►❚ ✕ 100
    .button#iterate(@click='showLog = !showLog') Logs
    .button#iterate(@click='clearLogs') Clear Logs
    .iteration {{iterations}}
    .score {{score}}
    .logs(v-show="showLog")
      .log(v-for="log in logs") {{log.join(', ')}}
</template>

<style lang="scss" scoped>
#control-panel {
  position: absolute;
  top: 0;
  text-align: center;
  color: white;
  padding: 3em;
  width: 100%;
  transition: 1s all ease-out;
  z-index: 10;
}

.logs {
  opacity: 0.6;
  background: black;
  color: white;
  height: 100%;
  width: 100%;
  font-size: 0.6em;
  overflow: scroll;
  position: absolute;
  left: 0;
  margin-top: 10px;
}

.score {
  font-weight: 500;
  margin: 1em
}

.button {
  border: 0.1em solid white;
  color: white;
  padding: 0 1.5em 0.1em 1.5em;
  margin: 0.5em;
  border-radius: 3em;
  font-size: 0.8em;
  line-height: 2.2em;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}
</style>
