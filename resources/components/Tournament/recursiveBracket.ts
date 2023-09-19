export interface Player {
  id: string | number;
  name: string;
  points: number;
  winner: boolean;
}

export interface Game {
  players: Player[];
}

export interface Round {
  title: string;
  parents: Array<Round>;
  players: Array<Player>;
}

export interface GameInput {
  players: Array<Player>;
}
export interface RoundInput {
  games: Array<Game>;
}

export default {
  transform (rounds: any) {
    if (!rounds) {
      throw new Error('Invalid rounds array')
    }

    let previousRound: any = null
    let currentRound: any = null

    rounds.forEach((round: any, index: number) => {
      currentRound = round.games.map((game: Game) => {
        return {
          ...game,
          title: `Round ${index + 1}`,
          round: index + 1,
          parents: [],
        }
      })

      if (!previousRound || previousRound.length === 0) {
        previousRound = currentRound
        return
      }

      for (let j = 0; j < previousRound.length; j++) {
        const matchForCurrentGame = Math.floor(j / 2)
        currentRound[matchForCurrentGame]?.parents?.push(previousRound[j])
      }

      previousRound = currentRound
    })

    return currentRound ? currentRound[0] : null
  },
}
