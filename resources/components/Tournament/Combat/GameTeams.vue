<template>
  <div
    v-for="(team, index) in teams"
    :key="index"
    :class="['team', getTeamClass(team)]"
    @mouseover="highlightTeam(team.id)"
    @mouseleave="unhighlightTeam"
  >
    <slot name="team" :team="team">
      <div v-for="(player, idx) in team.players" :key="idx" class="player">
        <slot name="player" :team="team" :player="player">
          {{ player.name }}
        </slot>
      </div>
    </slot>
  </div>

</template>

<script>
export default {
  props: ['highlightedTeamId', 'teams'],
  methods: {
    getTeamClass(team) {
      if (team.winner === null || team.winner === undefined) {
        return "";
      }

      let clazz = team.winner ? "winner" : "defeated";

      if (this.highlightedPlayerId === player.id) {
        clazz += " highlight";
      }

      return clazz;
    },
    highlightTeam(teamId) {
      this.$emit("onSelectedTeam", teamId);
    },
    unhighlightTeam() {
      this.$emit("onDeselectedTeam");
    }
  }
};
</script>

<style lang="scss" scoped>
.team {
  // min-width: 200px;
  @apply flex flex-col py-1 px-3;

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
</style>
