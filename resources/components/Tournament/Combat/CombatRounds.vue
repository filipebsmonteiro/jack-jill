<template>
  <div class="rounds">
    <div v-for="(round, idx) in rounds" :key="idx" class="round">
      <RoundGames :round="round" />
    </div>
  </div>
</template>

<script>
import RoundGames from './RoundGames.vue';

export default {
    props: ['games'],
    components: { RoundGames }
}
</script>

<style lang="scss" scoped>
</style>
