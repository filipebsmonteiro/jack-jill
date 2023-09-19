<template>
  <div class="flex">
    <div class="games">
      <div v-for="(game, idx) in games" :key="idx" class="game">
        <GameTeams :teams="game.teams" />
        <div class="game__footer">
          <slot name="game-footer" :game="game" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameTeams from './GameTeams.vue';

export default {
    props: ['games', 'hasParent'],
    components: { GameTeams }
}
</script>

<style lang="scss" scoped>
.games {
  // @apply flex items-start justify-end relative;
  // @apply relative flex flex-col items-start justify-center;
  @apply relative flex flex-col items-start;

  .game {
    @apply flex flex-col justify-center rounded shadow mt-3;

    &__footer {
      @apply p-2 bg-slate-200;

      &:empty {
        @apply hidden;
      }
    }

    &:before {
      content: "";
      position: absolute;
      background-color: gray;
      margin-left: 100%;
      width: 25px;
      height: 2px;
    }

    &:nth-child(even):after {
      content: "";
      position: absolute;
      background-color: gray;
      right: -25px;
      height: 25%;
      width: 2px;
      // top: calc(25% + 0.3rem);
      transform: translateY(-50%);
    }
  }
}
</style>
