<script>
import transpose from '../lib/transpose-position'

export default {
  props: ['player', 'team', 'index'],
  computed: {
    id () {
      return `${this.team}-player-${this.index}`
    },
    position () {
      const [y, x] = transpose(this.player.startPOS[0], this.player.startPOS[1])
      return { transform: `translate3d(${x}em, ${y}em, 0px)` }
    }
  }
}
</script>

<template lang="pug">
  .player(:id="id" :style="position")
    .player-card
      .icon(:class="team.toLowerCase()")
      .name {{player.name}}
</template>

<style lang="scss" scoped>
.player {
  position: absolute;
  transition: 0.2s all linear;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
}

.player .name {
  line-height: 2em;
  color: white;
  font-size: 0.6em;
  display: inline-block;
  position: absolute;
  transform: translateY(1.2em) rotateZ(0.1deg);
  transition: 1s all;
  white-space: nowrap;
  text-shadow: 0 0 2em rgba(0, 0, 0, 0.8), 0 0 0.5em rgba(0, 0, 0, 0.8), 0 0 0.5em rgba(0, 0, 0, 0.8), 0 0 1em rgba(0, 0, 0, 0.8), 0 0 2em rgba(0, 0, 0, 0.8), 0 0 2.5em rgba(0, 0, 0, 0.8);
}

.icon {
  height: 1.5em;
  width: 1.5em;
  background: white;
  background-size: 100%;
  border: 0.1em solid white;
  border-radius: 50%;
  position: absolute;
  top: -0.75em;
  left: -0.75em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.5);
  transform: translate3d(0, 0, 0px);
}

.icon.brazil {
  background-image: url(../assets/br.svg)
}

.icon.germany {
  background-image: url(../assets/de.svg);
  background-size: 100%;
}

.player-card {
  transition: 1s transform;
  display: flex;
  justify-content: center;
  transform: translate3d(0, 1px, 3px) rotateZ(0.1deg);
}

.threed.vertical .player-card {
  transform: rotateY(50deg) rotateX(0deg) rotateZ(-90deg) translateY(-17px);
}

.threed .player-card {
  transform: rotateY(0deg) rotateX(-50deg) translateY(-19px)
}

.threed .name {
  transform: translateY(-3.2em)  rotateZ(0.1deg);
}

.vertical .player-card {
  transform: rotateZ(-90deg);
}

</style>
