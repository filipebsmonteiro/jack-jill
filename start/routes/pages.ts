import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ inertia }) => inertia.render('HomePage'))

Route.group(() => {
  Route.get('/login', async ({ inertia }) => inertia.render('Auth/Login'))
  Route.get('/register', async ({ inertia }) => inertia.render('Auth/Register'))
}).prefix('/auth')

Route.group(() => {
  Route.get('/dashboard', async ({ inertia }) => inertia.render('Dashboard'))

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
  }).prefix('/event')
}).middleware('auth')
