<script>
import Pitch from '@/components/pitch.vue'
import ControlPanel from '@/components/control-panel.vue'
import Players from '@/components/players.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Pitch,
    ControlPanel,
    Players
  },
  created () {
    this.startGame()
    this.tick()

    this.calculatePitchScale()

    window.addEventListener('resize', () => this.calculatePitchScale())
  },
  methods: {
    ...mapActions(['startGame', 'iterateGame', 'calculatePitchScale']),
    async tick () {
      try {
        if (this.paused) return setTimeout(() => this.tick(), 300)

        await this.iterateGame()
        requestAnimationFrame(() => this.tick())
      } catch (e) {
        console.log('Match ends.')
      }
    }
  },
  computed: {
    ...mapState({
      freeze: state => state.freezeAnimations && 'freeze-animations',
      threeD: state => state.sizes.pitchView.threeD && 'threed',
      vertical: state => !state.sizes.pitchView.horizontal && 'vertical',
      portrait: state => state.sizes.pitchView.verticalOrientation && 'portrait',
      paused: state => state.paused
    })
  }
}
</script>

<template lang="pug">
  #home
    #world(:class="[freeze, threeD, vertical, portrait]")
      pitch
    control-panel
</template>

<style lang="scss" scoped>
#home {
  height: 100%;
  width: 100%;
}

#world {
  height: 100%;
  width: 100%;
  top: 2em;
  padding-top: 5em;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
}
</style>
