<script>
import Players from './players'
import Ball from './ball'

import { mapState } from 'vuex'

export default {
  name: 'pitch',
  components: { Players, Ball },
  computed: {
    ...mapState({
      ball: state => state.game.state && state.game.state.ball,
      fontSize: state => state.sizes.pitchHeight / 52.5
    })
  }
}
</script>

<template lang="pug">
  #container
    #stadium(:style="{ fontSize: fontSize + 'px' }")
      ball(v-if="ball" :ball="ball")
      players
      #pitch
        .half-line
        .zone.left
          span.box
          span.net
        .zone.right
          span.box
          span.net
</template>

<style lang="scss">

</style>

<style lang="scss" scoped>
#container {
  perspective: 1600;
  z-index: 2;
  transform-origin: 50%;
  transition-duration: 1s;
  transition-property: all;
}

#stadium {
  width: 55.5em;
  height: 34em;
  font-size: 16px;
  margin: 2em auto;
  transition-duration: 1s;
  transition-property: transform;
  transform-style: preserve-3d;
  transform-origin: 50%;
  transform: translate3d(0, 0, 1px) rotateX(0.1deg);
}

.threed.vertical #stadium {
  transform: rotateZ(0deg) translateX(-4em) scale(1) translateY(0%) rotateY(-50deg);
}

.threed.vertical #pitch {
  box-shadow: 2em 0px 4em 0px rgba(0, 0, 0, 0.7);
}

.threed #stadium {
  transform: rotateZ(0deg) translateX(0%) scale(1) translateY(0%) rotateY(0deg) rotateX(50deg);
}

.threed #pitch {
  box-shadow: 0px 2em 4em 0px rgba(0, 0, 0, 0.7);
}

.vertical #container {
  transform: rotateZ(90deg)
}

.vertical #stadium {
  transform: translateX(2em) scale(0.65);
}

.vertical #pitch {
  box-shadow: 2em 0px 4em 0px rgba(0, 0, 0, 0.7);
}

.portrait.vertical #stadium {
  transform: translateX(10em) scale(1);
}

.portrait.threed.vertical #stadium {
  transform: rotateZ(0deg) translateX(-4em) scale(1) translateY(0%) rotateY(-50deg);
}

#pitch {
  height: 100%;
  width: calc(100% - 3em);
  margin: 0 1.5em;
  top: 0;
  left: 0;
  border: 0.12em solid #FFF;
  background: green;
  background-image: url('../assets/grass.jpg');
  box-shadow: 0px 2em 4em 0px rgba(0, 0, 0, 0.7);
  background-repeat: repeat;
  background-size: 6.1em;
  background-position: -1.6em -1.2em;
  transform: translate3d(0, 0, 2px);
  opacity: 0.99;
  z-index: 2;
  backface-visibility: hidden;
}

#pitch::before {
  content: '';
  width: 9.15em;
  height: 9.15em;
  display: block;
  border: 0.12em solid #FFF;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#pitch::after {
  content: '';
  width: 0.25em;
  height: 0.25em;
  display: block;
  background: #FFF;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.half-line {
  left: calc(50% - 0px);
  transform: translate(-0.04em);
  height: 100%;
  width: 0.12em;
  min-width: 0.5px;
  z-index: 3;
  background: white;
}

.zone {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.zone::before,
.zone::after {
  content: '';
  width: 1em;
  height: 1em;
  display: block;
  border: 0.12em solid #FFF;
  border-top: 0.12em solid transparent;
  border-bottom: 0.12em solid transparent;
  border-left: 0.12em solid transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.zone::after {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%) rotate(-45deg);
}

.box {
  width: 8.25em;
  height: 20.15em;
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-0.1em, -50%);
  border: 0.12em solid #FFF;
  // background: linear-gradient(to right, transparent 0, transparent 3em, green 3em), linear-gradient(top, green 0, green 6em, transparent 6em, transparent 16em, green 16em), linear-gradient(left, transparent 0, transparent 3em, #FFF 3em, #FFF 3.1em, transparent 3.1em), linear-gradient(top, transparent 0, transparent 6em, #FFF 6em, #FFF 6.1em, transparent 6.1em, transparent 16em, #FFF 16em, #FFF 16.1em, transparent 16.1em), green;
}

.box::before {
  content: '';
  display: block;
  background: #FFF;
  border: 0.125em solid white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(5.5em, -50%);
}

.box::after {
  content: '';
  width: 9.15em;
  height: 9.15em;
  border: 0.12em solid #FFF;
  clip: rect(0em, 10.15em, 10.2em, 7.2em);
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 50%;
  left: 0.925em;
  transform: translate(0, -50%);
}

.zone.right {
  left: auto;
  right: 0;
  transform: rotate(180deg);
  // border: none;
}

.net {
  width: 1.5em;
  height: 3.66em;
  display: block;
  border: 0.12em solid #FFF;
  position: absolute;
  top: calc(50% - 1.83em);
  left: -1.5em;
  background: repeating-linear-gradient(45deg, transparent 0, transparent 3px, gold 3px, gold 4px, transparent 5px), repeating-linear-gradient(-45deg, transparent 0, transparent 3px, gold 3px, gold 4px, transparent 5px)
}

.net::before {
  content: '';
  position: absolute;
  display: block;
  height: 9.15em;
  width: 2.75em;
  border: 0.12em solid #FFF;
  top: 50%;
  left: 0;
  transform: translate(calc(1.3em), -50%);
}
</style>
