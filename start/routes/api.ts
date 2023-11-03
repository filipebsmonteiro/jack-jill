import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/file/:folder/:file', async ({response,params}) => {
  return response.download(Application.tmpPath(`uploads/${params.folder}/${params.file}`))
})

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout').middleware('auth')
  }).prefix('/auth')

  Route.get('user/autocomplete', 'UsersController.autocomplete').middleware('auth')
  Route.resource('user', 'UsersController').apiOnly()
    .middleware({ update: ['auth'], destroy: ['auth'] })

  Route.group(() => {
    Route.get('loadSubscribes', 'EventsController.loadSubscribes')
    Route.post('subscribe', 'EventsController.subscribe')
    Route.post('unsubscribe', 'EventsController.unsubscribe')
  }).prefix('event').middleware('auth')
  Route.resource('event', 'EventsController').apiOnly()
    .middleware({ create: ['auth'], update: ['auth'], destroy: ['auth'] })

  Route.group(() => {
    Route.resource('level', 'CompetitionLevelsController').apiOnly()
    Route.get('loadSubscribes', 'CompetitionsController.loadSubscribes')
    Route.post('subscribe', 'CompetitionsController.subscribe')
    Route.post('unsubscribe', 'CompetitionsController.unsubscribe')
    Route.group(() => {
      Route.get('load', 'CompetitionsController.loadScores')
      Route.post('persist', 'CompetitionsController.persistScore')
    }).prefix('score')
  }).prefix('competition').middleware('auth')
  Route.resource('competition', 'CompetitionsController').apiOnly()
    .middleware({ create: ['auth'], update: ['auth'], destroy: ['auth'] })

  Route.group(() => {
    Route.put('competition', 'SubscriptionsController.updateCompetitionSubscription')
    Route.put('event', 'SubscriptionsController.updateEventSubscription')
  }).prefix('subscription').middleware('auth')

  Route.group(() => {
    Route.get('resume', 'CompetitorsController.resume')
  }).prefix('competitor')
}).prefix('/api/v1')
