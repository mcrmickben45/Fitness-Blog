const { Sequelize } = require('sequelize');
const { sequelize } = require('./models');
const config = require('./config/config.json');
const models = require('./models');

const sequelize = new Sequelize(config.development);

const db = {
  sequelize,
  Sequelize,
  models,
};

Object.values(db.models).forEach((model) => {
  if (model.associate) {
    model.associate(db.models);
  }
});

db.sequelize.sync({ force: true }); 

module.exports = db;