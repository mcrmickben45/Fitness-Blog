const { Sequelize } = require('sequelize');
const config = require('./config/config.json');
const models = require('./models');

const sequelize = new Sequelize(config.development);

const db = {
  sequelize,
  Sequelize,
  models,
};

// Call sequelize.sync() after importing your models
Object.values(db.models).forEach((model) => {
  if (model.associate) {
    model.associate(db.models);
  }
});

// Synchronize the models with the database
db.sequelize.sync({ force: true }); // force: true for development, be cautious in production

module.exports = db;