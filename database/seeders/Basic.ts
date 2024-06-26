import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CompetitionLevel from 'App/Models/CompetitionLevel'
import CompetitionFactory from 'Database/factories/CompetitionFactory'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run () {
    const level = await CompetitionLevel.create({ name: 'Novice' })
    await CompetitionLevel.create({ name: 'Intermediary' })
    await CompetitionLevel.create({ name: 'Advanced' })

    await CompetitionFactory
      .with('users', 2)
      .with('users', 6, (user) => {
        user.pivotAttributes([
          { level_id: level.id, status: 'approved', role: 'follower' },
          { level_id: level.id, status: 'approved', role: 'follower' },
          { level_id: level.id, status: 'approved', role: 'leader' },
          { level_id: level.id, status: 'approved', role: 'leader' },
          { level_id: level.id, status: 'approved', role: 'judge' },
          { level_id: level.id, status: 'approved', role: 'judge' },
        ])
      })
      .merge([ { type: 'sortition' }, { type: 'combat' } ])
      .createMany(4)

    await UserFactory.merge([
      {
        first_name: 'Filipe',
        last_name: 'Monteiro',
        email: 'filipebsmonteiro@gmail.com',
        password: 'asdfasdf',
        system_role: 'admin',
      },
    ]).create()
  }
}
