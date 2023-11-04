import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CompetitionScore from 'App/Models/CompetitionScore'
import ScoreValidator from 'App/Validators/Competition/ScoreValidator'

interface Score {
  competition_id: string,
  competitor_id: string,
  judge_id: string,
  level_id: string,
  round: string,
  score: number
};

export default class CompetitionScoresController {
  public async index ({ request, response }: HttpContextContract) {
    let query = CompetitionScore.query()

    Object.entries(request.qs()).map(([column, value]) => query = query.where(column, value))

    const scores = await query.pojo()

    return response.status(200).json(scores)
  }

  public async store ({ request, response }: HttpContextContract) {
    const {
      competitionId,
      competitorId,
      judgeId,
      levelId,
      round,
      score,
      scores,
    } = await request.validate(ScoreValidator)

    if (!scores) {
      const created = await CompetitionScore.updateOrCreate(
        {
          competition_id: competitionId,
          competitor_id: competitorId,
          judge_id: judgeId,
          level_id: levelId,
          round: round,
        },
        {
          score,
        }
      )

      return response.status(200).json(created.serialize())
    }

    const scoresToPersist: Score[] = scores.map(score => ({
      competition_id: score.competitionId,
      competitor_id: score.competitorId,
      judge_id: score.judgeId,
      level_id: score.levelId,
      round: score.round,
      score: score.score,
    }))
    const created = await CompetitionScore.updateOrCreateMany('round', scoresToPersist)

    return response.status(200).json(created.map(s => s.serialize()))
  }
}
