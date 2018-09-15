<script>
import Player from './player'
export default {
  name: 'team',
  components: { Player },
  props: ['team']
}
</script>

<template lang="pug">
  .team
    player(v-for="(player, index) in team.players" :player="player" :team="team.name" :index="index" :key="player.name")
</template>

<style lang="scss" scoped>
  .team {
    backface-visibility: hidden;
  }
</style>
