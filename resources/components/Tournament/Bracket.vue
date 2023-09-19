<template>
  <GameNode
    v-if="recursiveBracket"
    :bracket-node="recursiveBracket"
    :highlighted-player-id="highlightedPlayerId"
    @onSelectedPlayer="highlightPlayer"
    @onDeselectedPlayer="unhighlightPlayer"
  >
    <template #player="{ game, player }">
      <slot name="player" :game="game" :player="player" />
    </template>
    <template #game-bottom="{ game }">
      <slot name="game-bottom" :game="game" />
    </template>
  </GameNode>
</template>

<script>
import GameNode from "Resources/components/Tournament/GameNode";
import recursiveBracket from "Resources/components/Tournament/recursiveBracket";

export default {
  name: "bracket",
  components: {
    GameNode,
  },
  props: {
    rounds: {
      type: Array,
      required: true,
      default: () => [
        // Eight Finals
        {
          games: [
            {
              players: [
                { id: "1", name: "Competitor 1", winner: true },
                { id: "2", name: "Competitor 2", winner: false },
              ],
            },
            {
              players: [
                { id: "3", name: "Competitor 3", winner: false },
                { id: "4", name: "Competitor 4", winner: true },
              ],
            },
            {
              players: [
                { id: "5", name: "Competitor 5", winner: true },
                { id: "6", name: "Competitor 6", winner: false },
              ],
            },
            {
              players: [
                { id: "7", name: "Competitor 7", winner: false },
                { id: "8", name: "Competitor 8", winner: true },
              ],
            },
            {
              players: [
                { id: "9", name: "Competitor 9", winner: true },
                { id: "10", name: "Competitor 10", winner: false },
              ],
            },
            {
              players: [
                { id: "11", name: "Competitor 11", winner: false },
                { id: "12", name: "Competitor 12", winner: true },
              ],
            },
            {
              players: [
                { id: "13", name: "Competitor 13", winner: true },
                { id: "14", name: "Competitor 14", winner: false },
              ],
            },
            {
              players: [
                { id: "15", name: "Competitor 15", winner: false },
                { id: "16", name: "Competitor 16", winner: true },
              ],
            },
          ]
        },

        // Quarter Finals
        {
          games: [
            {
              players: [
                { id: "1", name: "Competitor 1", winner: true },
                { id: "3", name: "Competitor 3", winner: false },
              ],
            },
            {
              players: [
                { id: "5", name: "Competitor 5", winner: false },
                { id: "7", name: "Competitor 7", winner: true },
              ],
            },
            {
              players: [
                { id: "9", name: "Competitor 9", winner: true },
                { id: "11", name: "Competitor 11", winner: false },
              ],
            },
            {
              players: [
                { id: "13", name: "Competitor 13", winner: false },
                { id: "15", name: "Competitor 15", winner: true },
              ],
            },
          ]
        },

        // Semi Finals
        {
          games: [
            {
              players: [
                { id: "1", name: "Competitor 1", winner: true },
                { id: "5", name: "Competitor 5", winner: false },
              ],
            },
            {
              players: [
                { id: "9", name: "Competitor 9", winner: true },
                { id: "13", name: "Competitor 13", winner: false },
              ],
            },
          ]
        },

        // Final
        {
          games: [
            {
              players: [
                { id: "1", name: "Competitor 1", winner: false },
                { id: "9", name: "Competitor 9", winner: true },
              ],
            },
          ]
        },
      ]
    }
  },
  data() {
    return {
      highlightedPlayerId: null,
    };
  },
  computed: {
    recursiveBracket() {
      return recursiveBracket.transform(this.rounds);
    },
  },
  methods: {
    highlightPlayer(id) {
      this.highlightedPlayerId = id;
    },
    unhighlightPlayer() {
      this.highlightedPlayerId = null;
    },
  },
};
</script>
