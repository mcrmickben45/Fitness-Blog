const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local strategy for user login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await db.User.findOne({ where: { username } });

        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (error) {
        console.error('Error during authentication:', error);
        return done(error);
      }
    }
  )
);
module.exports = passport;