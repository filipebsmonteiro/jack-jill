import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ inertia }) => inertia.render('HomePage'))

Route.group(() => {
  Route.get('/login', async ({ inertia }) => inertia.render('Auth/Login'))
  Route.get('/register', async ({ inertia }) => inertia.render('Auth/Register'))
}).prefix('/auth')

Route.group(() => {
  Route.get('/dashboard', async ({ inertia }) => inertia.render('Dashboard'))
  Route.get('/profile', async ({ inertia }) => inertia.render('Users/ProfilePage'))

  // Users Routes
  Route.group(() => {
    Route.get('list', async ({ inertia }) => inertia.render('Users/ListPage'))
    Route.get('/create', async ({ inertia }) => inertia.render('Users/CreateEditPage'))
    Route.get('/edit/:id', async ({ inertia }) => inertia.render('Users/CreateEditPage'))
  }).prefix('/user')

  // Event Routes
  Route.group(() => {
    Route.get('list', async ({ inertia }) => inertia.render('Events/ListPage'))
    Route.get('/create', async ({ inertia }) => inertia.render('Events/CreateEditPage'))
    Route.get('/edit/:id', async ({ inertia }) => inertia.render('Events/CreateEditPage'))
    // Route.get('/:id/subscribes', async ({ inertia, route, routeKey, params, request }) =>
    //   inertia.render('Events/SubscribesPage', { request, route, routeKey, params })
    // )
    Route.get('/:id/subscribes', ({ inertia, params }) => inertia.render('Events/SubscribesPage', params))
  }).prefix('/event')

  // Competition Routes
  Route.group(() => {
    Route.get('list', async ({ inertia }) => inertia.render('Competitions/ListPage'))
    Route.get('/create', async ({ inertia }) => inertia.render('Competitions/CreateEditPage'))
    Route.get('/edit/:id', async ({ inertia }) => inertia.render('Competitions/CreateEditPage'))
  }).prefix('/competition')
}).middleware('auth')
