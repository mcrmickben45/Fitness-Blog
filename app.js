const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection.js');
const path = require('path');

const app = express();

// View engine 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up session 
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));


// Middleware 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes 
app.use('/', require('./controllers/homeController.js'));
app.use('/auth', require('./controllers/authController.js'));
app.use('/dashboard', require('./controllers/dashboardController.js'));
app.use('/workout', require('./controllers/workoutController.js'));
app.use('/nutrition', require('./controllers/nutritionController.js'));
app.use('/profile', require('./controllers/profileController.js'));

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


















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
