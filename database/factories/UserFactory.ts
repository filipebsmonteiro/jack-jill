import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CompetitionFactory from './CompetitionFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    phone: faker.phone.number(),
    state: faker.location.state(),
    country: faker.location.country(),
  }
})
  .relation('competitions', () => CompetitionFactory)
  .build()
