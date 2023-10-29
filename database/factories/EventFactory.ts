import Event from 'App/Models/Event'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Event, ({ faker }) => {
  return {
    name: faker.lorem.sentence(),
    description: faker.lorem.sentences(4),
    location: `${faker.location.street()}, ${faker.location.city()} - ${faker.location.state()} - ${faker.location.countryCode()}`,
    type: faker.string.alpha(),
    status: faker.helpers.arrayElement(['draft', 'published', 'canceled']),
    start_date: faker.date.soon({ days: 30 }),
    end_date: faker.date.soon({ days: 40 }),
  }
}).build()
