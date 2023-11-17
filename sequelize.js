const { Sequelize } = require('sequelize');
const { development } = require('./config/config.json');

const sequelize = new Sequelize(kmi9hbmemcetxpb7, an0g5pgtn7w5p08t, mbfoxq1aic0i8kdv, {
  host: i0rgccmrx3at3wv3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com,
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


await sequelize.sync();

module.exports = sequelize;
