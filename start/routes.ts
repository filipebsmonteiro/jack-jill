/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/welcome', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.get('/logout', 'AuthController.logout')
    Route.get('/user', 'AuthController.user')
  }).prefix('/auth')
  Route.resource('users', 'UsersController').apiOnly().middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
  Route.resource('events', 'EventsController').apiOnly().middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
}).prefix('/api/v1')

Route.get('/', async ({ inertia }) => inertia.render('HomePage'))
Route.get('/users', async ({ inertia }) => inertia.render('Users/IndexPage'))
Route.group(() => {
  Route.get('/login', async ({ inertia }) => inertia.render('Auth/Login'))
  Route.post('/register', async ({ inertia }) => inertia.render('Auth/Register'))
}).prefix('/auth')
