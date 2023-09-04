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

  Route.resource('user', 'UsersController').apiOnly()
    .middleware({ update: ['auth'], destroy: ['auth'] })

  Route.resource('event', 'EventsController').apiOnly()
    .middleware({ create: ['auth'], update: ['auth'], destroy: ['auth'] })
}).prefix('/api/v1')
