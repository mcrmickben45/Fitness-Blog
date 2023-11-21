app.listen(PORT,console.log(
  `Server started on port ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

const users = [];

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

app.get('/', requireLogin, (req, res) => {
  res.send(`Welcome, ${req.session.username}! <a href="/logout">Logout</a>`);
});

app.get('/register', (req, res) => {
  res.send(`
    <form method="post" action="/register">
      <input type="text" name="username" placeholder="Username" required>
      <input type="text" name="screenName" placeholder="Screen Name" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  `);
});

app.post('/register', async (req, res) => {
  const { username, screenName, password } = req.body;

  if (users.some(user => user.username === username)) {
    return res.send('Username already taken. Choose another one.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, screenName, password: hashedPassword });

  req.session.userId = users.length;
  req.session.username = username;
  req.session.screenName = screenName;

  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.screenName = user.screenName;

    return res.redirect('/');
  }

  res.send('Invalid username or password.');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
