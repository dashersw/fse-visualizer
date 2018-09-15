<script>
import transpose from '../lib/transpose-position'

export default {
  name: 'ball',
  props: ['ball'],
  computed: {
    position () {
      const [y, x] = transpose(this.ball.position[0], this.ball.position[1])
      return { transform: `translate3d(${x}em, ${y}em, 20px)` }
    }
  }
}
</script>
<template lang="pug">
  #ball(:style="position")
    .shadow
    .icon
</template>

<style lang="scss" scoped>
#ball {
  position: absolute;
  top: 0;
  left: 1.5em;
  z-index: 22;
  transition: 0.2s all linear;
  transform-style: preserve-3d;
}

.icon {
  position: absolute;
  background: url('../assets/ball.svg') white center no-repeat;
  background-size: 0.8em;
  border-radius: 50%;
  height: 0.8em;
  width: 0.8em;
  transform: translate3d(0, 0, 1px);
  transition: 1s all ease-out;
}

.shadow {
  position: absolute;
  transform: translateY(0.05em) rotateX(1deg);
  height: 1px;
  top: 0.6em;
  left: 0em;
  width: 0.8em;
  border-radius: 50%;
  box-shadow: 0 0 2px 3px black;
  background: rgba(0, 0, 0, 0.9);
  opacity: 0.7;
  transition: 1s all linear;
  ;
}

.vertical #ball .shadow {
  transform: translateY(0.35em) translateZ(-0.3em) rotate(-90deg) translateX(0em);
  top: 0;
  left: 0.2em;
}

.threed #ball .shadow {
  transform: translateY(0.12em) translateZ(-0.3em)
}

.threed.vertical #ball .shadow {
  transform: translateY(0.12em) translateZ(-0.3em) rotate(-90deg) translateX(0.4em);
  left: 0;
  top: 0.6em
}

.threed.vertical .icon {
  transform: rotateY(50deg) rotateX(0deg) translateZ(10px) rotateZ(0);
}

.threed .icon {
  transform: rotateY(0deg) rotateX(-50deg) translateZ(10px) translateY(0.12em) rotateZ(0);
}
</style>
