import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ScoreValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // Validate unique object
    competitionId: schema.string.optional([
      rules.requiredIfNotExists('scores'),
    ]),
    competitorId: schema.string.optional([
      rules.requiredIfNotExists('scores'),
    ]),
    judgeId: schema.string.optional([
      rules.requiredIfNotExists('scores'),
    ]),
    levelId: schema.string.optional([
      rules.requiredIfNotExists('scores'),
    ]),
    score: schema.number.optional([
      rules.requiredIfNotExists('scores'),
    ]),
    round: schema.string.optional([
      rules.requiredIfNotExists('scores'),
    ]),

    scores: schema.array
      .optional([
        rules.minLength(1),
        rules.requiredIfNotExists('competitionId'),
        // rules.requiredIfNotExists('competitorId'),
        // rules.requiredIfNotExists('judgeId'),
        // rules.requiredIfNotExists('levelId'),
        // rules.requiredIfNotExists('score'),
        // rules.requiredIfNotExists('round'),
      ])
      .members(
        schema.object().members({
          competitionId: schema.string(),
          competitorId: schema.string(),
          judgeId: schema.string(),
          levelId: schema.string(),
          score: schema.number(),
          round: schema.string(),
        })
      ),
  })

  public messages: CustomMessages = {
    // 'score.unique': 'Score is already taken',
  }
}
