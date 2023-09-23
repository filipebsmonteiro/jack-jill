<template>
  <!-- <FormKit
    type="select"
    :options="[4, 8, 16, 32, 64, 128]"
    v-model="numberSubscribers"
  /> -->
  <GameNode
    :game="finalNode"
    @onSelectedPlayer=""
    @onDeselectedPlayer=""
  >
    <!-- <template #player="{ player }">
      <div class="flex">
        <div class="text-sm font-medium text-gray-900">
          {{ player.name }}
        </div>
        <FormKit />
      </div>
    </template> -->
    <template #suffix-team="{ team }">
      <button
        type="button"
        class="btn btn-sm btn-rounded btn-outline"
        @click="addPlayer(team.id)"
      >+Player</button>
    </template>
    <template #suffix-game="{ game }">
      <!-- <div class="flex fle-col absolute" style="top: calc(50% - 15px); left: -32%;"> -->
      <div class="flex">
        <button
          type="button"
          class="btn btn-sm btn-rounded btn-outline"
          @click="addTeam(game.id)"
        >+Team</button>
        <button
          type="button"
          class="btn btn-sm btn-rounded btn-outline"
          @click="addParentGame(game.id)"
        >+Game</button>
      </div>
    </template>
  </GameNode>
</template>

<script>
import { v4 as uuid } from "uuid";
import { reactive } from "vue"
import GameNode from "Resources/components/Tournament/GameNode";

export default {
  // data() {
  //   return {
  //     numberSubscribers: 4,
  //     defaultPlayer: { id: "", name: "", winner: null },
  //     rounds: reactive([]),
  //   }
  // },
  // watch: {
  //   numberSubscribers: {
  //     immediate: true,
  //     handler(value) {
  //       this.rounds = reactive([])
  //       const roundsAllowed = Math.floor(value / 4) // Multiple of 4
  //       let competitorsOnRound = roundsAllowed * 4

  //       do {
  //         const competitors = this.generatePlayers(competitorsOnRound)
  //         const playersChunks = this.chunk(competitors, 2)
  //         this.rounds.push({
  //           games: playersChunks.map(players => ({ players }))
  //         })
  //         competitorsOnRound = competitorsOnRound / 2
  //       } while (competitorsOnRound >= 2)
  //     },
  //   },
  // },
  // methods: {
  //   chunk(array, chunkSize) {
  //     return array.reduce((acc, val, i) => {
  //       acc.push(array.slice(i * chunkSize, i * chunkSize + chunkSize))
  //       return acc;
  //     }, []).filter(acc => acc.length > 0);
  //   },
  //   generateArray(quantity) {
  //     return Array.from(Array(quantity).keys())
  //   },
  //   generatePlayers(quantity) {
  //     const playersArray = this.generateArray(quantity)
  //     // return playersArray.map((_, index) => ({...this.defaultPlayer, id: index}))
  //     return playersArray.map((_, index) => ({...this.defaultPlayer}))
  //   },
  // },
  components: {
    GameNode,
  },
  data() {
    return {
      finalNode: {
        id: uuid(),
        title: 'Final',
        teams: [
          {
            id: uuid(),
            players: [
              { id: uuid(), name: 'Player 1', winner: null },
              { id: uuid(), name: 'Player 2', winner: null },
            ]
          }
        ],
        parents: []
      },
    }
  },
  methods: {
    addParentGame(gameId, node) {
      const game = node ?? this.finalNode
      if (gameId === game.id) {
        game.parents.push({ id: uuid(), teams: [], parents: [], title: 'Game '+game.parents.length+1 })
        return;
      }

      game.parents.forEach(parent => this.addParentGame(gameId, parent));
    },
    addTeam(gameId, node) {
      const game = node ?? this.finalNode
      if (gameId === game.id) {
        game.teams.push({ id: uuid(), players: [] })
        return;
      }

      game.parents.forEach(parent => this.addTeam(gameId, parent));
    },
    addPlayer(teamId, node) {
      const game = node ?? this.finalNode

      if (game.teams.some(t => t.id == teamId)) {
        game.teams.forEach(t => {
          if (t.id == teamId) {
            t.players.push({ id: uuid(), name: `Player ${t.players.length + 1}`, winner: null })
          }
        })
        return;
      }

      game.parents.forEach(parent => this.addPlayer(teamId, parent));
    },
  }
}
</script>
