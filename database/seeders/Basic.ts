import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CompetitionLevel from 'App/Models/CompetitionLevel'
import CompetitionFactory from 'Database/factories/CompetitionFactory'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run () {
    const level = await CompetitionLevel.create({ name: 'Novice' })

    await CompetitionFactory
      .with('competitors', 2)
      .with('competitors', 6, (user) => {
        user.pivotAttributes([
          { level_id: level.id, status: 'approved' },
          { level_id: level.id, status: 'approved' },
          { level_id: level.id, status: 'approved' },
          { level_id: level.id, status: 'approved' },
          { level_id: level.id, status: 'approved' },
          { level_id: level.id, status: 'approved' },
        ])
      })
      .createMany(4)

    await UserFactory.merge([
      {
        first_name: 'Filipe',
        last_name: 'Monteiro',
        email: 'filipebsmonteiro@gmail.com',
        password: 'asdfasdf',
      },
    ]).create()
  }
}
