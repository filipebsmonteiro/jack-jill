<template>
  <div class="game">
    <div
      v-for="(team, index) in game.teams"
      :key="index"
      class="border-b-2 border-black"
    >
      <div
        v-for="(player, idx) in team.players"
        :key="idx"
        :class="['game__player', getPlayerClass(player)]"
        @mouseover="highlightPlayer(player.id)"
        @mouseleave="unhighlightPlayer"
      >
        <slot name="player" :player="player">
          {{ player.name }}
        </slot>
      </div>
      <slot name="suffix-team" :team="team" />
    </div>
    <div class="game__description">
      <slot name="game-description" :game="game" />
    </div>
  </div>
  <slot name="suffix-game" :game="game" />
</template>

<script>
export default {
  props: ['highlightedPlayerId', 'game'],
  emits: ['onSelectedPlayer', 'onDeselectedPlayer'],
  methods: {
    getPlayerClass(player) {
      if (player.winner === null || player.winner === undefined) {
        return "";
      }

      let clazz = player.winner ? "winner" : "defeated";

      if (this.highlightedPlayerId === player.id) {
        clazz += " highlight";
      }

      return clazz;
    },
    highlightPlayer(playerId) {
      this.$emit("onSelectedPlayer", playerId);
    },
    unhighlightPlayer() {
      this.$emit("onDeselectedPlayer");
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  @apply rounded overflow-hidden shadow shadow-lg;

  &__player {
    min-width: 200px;
    @apply py-1 px-3 bg-slate-200;

    &.winner {
      @apply bg-green-400 text-white;

      &.highlight {
        @apply bg-green-600;
      }
    }

    &.defeated {
      @apply bg-red-400 text-white;

      &.highlight {
        @apply bg-red-600;
      }
    }
  }

  &__description {
    @apply p-2;

    &:empty {
      @apply hidden;
    }
  }
}
</style>
