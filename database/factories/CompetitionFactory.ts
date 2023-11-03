import Competition from 'App/Models/Competition'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'

export default Factory.define(Competition, ({ faker }) => {
  return {
    name: faker.lorem.slug({ min: 1, max: 1 }),
    description: faker.lorem.sentences(3),
    type: faker.helpers.arrayElement(['combat', 'sortition']),
  }
})
  .relation('users', () => UserFactory)
  .build()
