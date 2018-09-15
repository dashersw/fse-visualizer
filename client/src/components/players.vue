<script>
import Team from './team'
import {mapState} from 'vuex'

export default {
  name: 'players',
  components: {Team},
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      kickOffTeam: state => state.game.state && state.game.state.kickOffTeam,
      secondTeam: state => state.game.state && state.game.state.secondTeam
    })
  }
}
</script>

<template lang="pug">
  #players
    team(v-if="kickOffTeam" :team="kickOffTeam")
    team(v-if="secondTeam" :team="secondTeam")
</template>

<style lang="scss" scoped>
#players {
  position: absolute;
  height: 100%;
  width: calc(100% - 3em);
  margin: 0 1.5em;
  top: 0;
  z-index: 21;
  transform: translateZ(5px);
  transform-style: preserve-3d
}
</style>
