import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ScoreValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    competitionId: schema.string(),
    competitorId: schema.string(),
    judgeId: schema.string(),
    score: schema.number(),
  })

  public messages: CustomMessages = {
    // 'score.unique': 'Score is already taken',
  }
}
