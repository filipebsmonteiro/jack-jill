// import Event from '@ioc:Adonis/Core/Event'
// import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CompetitionScore from 'App/Models/CompetitionScore'
import DeleteValidator from 'App/Validators/Competition/Score/DeleteValidator'
import PersistValidator from 'App/Validators/Competition/Score/PersistValidator'

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
    } = await request.validate(PersistValidator)

    if (!scores) {
      // Event.on('db:query', Database.prettyPrint)

      const created = await CompetitionScore.query()
        .where('competition_id', competitionId as string)
        .where('level_id', levelId as string)
        .where('round', round as string)
        .where('judge_id', judgeId as string)
        .where('competitor_id', competitorId as string)
        .first()
        .then(async (compScore) => {
          let newOne = compScore
          if (!compScore) {
            newOne = await CompetitionScore.create({
              competition_id: competitionId,
              level_id: levelId,
              round: round,
              judge_id: judgeId,
              competitor_id: competitorId,
              score,
            })
            return newOne
          }
          return newOne
        })

      await CompetitionScore.query()
        .where('competition_id', competitionId as string)
        .where('level_id', levelId as string)
        .where('round', round as string)
        .where('judge_id', judgeId as string)
        .where('competitor_id', competitorId as string)
        .update({ score })

      return response.status(200).json(created?.serialize())
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

  public async destroy ({ request, response }: HttpContextContract) {
    const { competitionId, levelId, round } = await request.validate(DeleteValidator)
    await CompetitionScore.query()
      .where('competition_id', competitionId)
      .andWhere('level_id', levelId)
      .andWhere('round', round)
      .delete()
    return response.status(200)
  }
}
