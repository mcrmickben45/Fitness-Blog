const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize'); 
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'an0g5pgtn7w5p08t',
  password: 'mbfoxq1aic0i8kdv',
  database: 'fitness_blog_db',
});


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.get('/', (req, res) => {
  res.render('home', { layout: 'main' });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { layout: 'main' });
});

app.get('/login', (req, res) => {
  res.render('login', { layout: 'main' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { layout: 'main' });
});

app.get('*', (req, res) => {
  res.render('notfound', { layout: 'main' });
});

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
































// const express = require('express');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const db = require('./models');
// const dotenv = require('dotenv');
// const Sequelize = require('sequelize');

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize({
//   // Your database configuration options
//   dialect: 'mysql',
//   host: 'localhost',
//   username: 'your_username',
//   password: 'your_password',
//   database: 'fitness_blog_db',
// });

// const models = require('./models');  // Assuming your models are in the 'models' folder

// // Pass Sequelize instance to models
// Object.values(models).forEach((model) => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

// // Sync the models with the database
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synced successfully');
// });

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// const config = require('./config/config.json');
// const models = require('./models');

// const sequelize = new Sequelize(config.development);

// const db = {
//   sequelize,
//   Sequelize,
//   models,
// };

// // Call sequelize.sync() after importing your models
// Object.values(db.models).forEach((model) => {
//   if (model.associate) {
//     model.associate(db.models);
//   }
// });

// // Synchronize the models with the database
// db.sequelize.sync({ force: true }); // force: true for development, be cautious in production

// module.exports = db;
// // Set up Sequelize for session
// const sequelize = new SequelizeStore({
//   db: db.sequelize,
// });

// // Set up session
// app.use(
//   session({
//     secret: 'your-secret-key', // add secret key to session
//     resave: false,
//     saveUninitialized: false,
//     store: sequelize,
//   })
// );

// // Set up Handlebars
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Define routes
// app.get('/', (req, res) => {
//   res.render('home', { layout: 'main' });
// });

// app.get('/dashboard', (req, res) => {
//   res.render('dashboard', { layout: 'main' });
// });

// // Additional routes
// app.get('/login', (req, res) => {
//   res.render('login', { layout: 'main' });
// });

// app.get('/signup', (req, res) => {
//   res.render('signup', { layout: 'main' });
// });

// // Error page route
// app.get('*', (req, res) => {
//   res.render('notfound', { layout: 'main' });
// });

// // Sync Sequelize and start the server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// });






















// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const sequelize = require('./config/connection.js');
// const path = require('path');

// const app = express();

// // View engine 
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// // Set up session 
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const sess = {
//     secret: process.env.SESSION_SECRET,
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize,
//     }),
// };

// app.use(session(sess));


// // Middleware 
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Routes 
// app.use('/', require('./controllers/homeController.js'));
// app.use('/auth', require('./controllers/authController.js'));
// app.use('/dashboard', require('./controllers/dashboardController.js'));
// app.use('/workout', require('./controllers/workoutController.js'));
// app.use('/nutrition', require('./controllers/nutritionController.js'));
// app.use('/profile', require('./controllers/profileController.js'));

// // Start Server
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


















// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// const users = [];

// const requireLogin = (req, res, next) => {
//   if (!req.session.userId) {
//     return res.redirect('/login');
//   }
//   next();
// };

// app.get('/', requireLogin, (req, res) => {
//   res.send(`Welcome, ${req.session.username}! <a href="/logout">Logout</a>`);
// });

// app.get('/register', (req, res) => {
//   res.send(`
//     <form method="post" action="/register">
//       <input type="text" name="username" placeholder="Username" required>
//       <input type="text" name="screenName" placeholder="Screen Name" required>
//       <input type="password" name="password" placeholder="Password" required>
//       <button type="submit">Register</button>
//     </form>
//   `);
// });

// app.post('/register', async (req, res) => {
//   const { username, screenName, password } = req.body;

//   if (users.some(user => user.username === username)) {
//     return res.send('Username already taken. Choose another one.');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   users.push({ username, screenName, password: hashedPassword });

//   req.session.userId = users.length;
//   req.session.username = username;
//   req.session.screenName = screenName;

//   res.redirect('/');
// });

// app.get('/login', (req, res) => {
//   res.send(`
//     <form method="post" action="/login">
//       <input type="text" name="username" placeholder="Username" required>
//       <input type="password" name="password" placeholder="Password" required>
//       <button type="submit">Login</button>
//     </form>
//   `);
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(user => user.username === username);

//   if (user && await bcrypt.compare(password, user.password)) {
//     req.session.userId = user.id;
//     req.session.username = user.username;
//     req.session.screenName = user.screenName;

//     return res.redirect('/');
//   }

//   res.send('Invalid username or password.');
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/login');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const { registerUser, authenticateUser } = require('./users');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
// }, (email, password, done) => {
//   const user = authenticateUser(email, password);
//   return user ? done(null, user) : done(null, false, { message: 'Invalid credentials' });
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const users = readUsers();
//   const user = users.find(u => u.id === id);
//   done(null, user);
// });

// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;
//   const newUser = registerUser(username, email, password);

//   if (newUser) {
//     req.login(newUser, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error logging in after registration' });
//       }
//       return res.json(newUser);
//     });
//   } else {
//     res.status(400).json({ message: 'Username or email is already taken' });
//   }
// });

// app.post('/login', passport.authenticate('local'), (req, res) => {
//   res.json(req.user);
// });

// app.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });