import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout').middleware('auth')
  }).prefix('/auth')

  Route.resource('user', 'UsersController').apiOnly()
    .middleware({ update: ['auth'], destroy: ['auth'] })
}).prefix('/api/v1')
