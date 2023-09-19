<template>
  <div class="game-node">
    <div v-if="game.parents.length">
      <div class="parents" v-for="(game, index) in game.parents" :key="index">
        <GameNode
          :game="game"
          :highlighted-player-id="highlightedPlayerId"
          @onSelectedPlayer="highlightPlayer"
          @onDeselectedPlayer="unhighlightPlayer"
        >
          <template #player="{ player }">
            <slot name="player" :game="game" :player="player" />
          </template>
          <template #game-description>
            <slot name="game-description" :game="game" />
          </template>
          <template #suffix-team="{ team }">
            <slot name="suffix-team" :team="team" />
          </template>
          <template #suffix-game="{ game }">
            <slot name="suffix-game" :game="game" />
          </template>
        </GameNode>
      </div>
    </div>

    <div :class="{ 'game-wrapper': true, 'has-parents': game.parents.length > 0 }">
      <GamePlayers
        :highlighted-player-id="highlightedPlayerId"
        :game="game"
        @onSelectedPlayer="highlightPlayer"
        @onDeselectedPlayer="unhighlightPlayer"
      >
        <template #player="{ player }">
          <slot name="player" :game="game" :player="player" />
        </template>
        <template #game-description="{ game }">
          <slot name="game-description" :game="game" />
        </template>
        <template #suffix-team="{ team }">
          <slot name="suffix-team" :team="team" />
        </template>
        <template #suffix-game="{ game }">
          <slot name="suffix-game" :game="game" />
        </template>
      </GamePlayers>
    </div>

  </div>
</template>

<script>
import GamePlayers from "Resources/components/Tournament/GamePlayers";

export default {
  components: { GamePlayers },
  emits: ['onSelectedPlayer', 'onDeselectedPlayer'],
  props: {
    game: {
      type: Object,
      required: true,
    },
    highlightedPlayerId: {
      type: Number | String,
      required: false,
    },
  },
  methods: {
    highlightPlayer(playerId) {
      this.$emit("onSelectedPlayer", playerId);
    },
    unhighlightPlayer() {
      this.$emit("onDeselectedPlayer");
    },
  },
};
</script>

<style lang="scss">
.game-node {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.game-wrapper {
  @apply flex flex-col items-center;
}

.has-parents {
  position: relative;
  margin-left: 50px;

  &:after {
    position: absolute;
    content: "";
    width: 25px;
    height: 2px;
    left: 0;
    top: 50%;
    background-color: gray;
    transform: translateX(-100%);
  }
}


.parents {
  @apply flex items-start justify-end relative;

  &:before {
    content: "";
    position: absolute;
    background-color: gray;
    right: 0;
    top: 50%;
    transform: translateX(100%);
    width: 25px;
    height: 2px;
  }

  &:after {
    content: "";
    position: absolute;
    background-color: gray;
    right: -25px;
    height: calc(75% + 19px);
    width: 2px;
    top: 50%;
  }

  &:last-child:after {
    transform: translateY(-100%);
  }
}
</style>
