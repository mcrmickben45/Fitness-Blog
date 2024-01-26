// Import all models
const Post = require('./post');
const User = require('./user');
const Comment = require('./comment');
const Workout = require('./workout');
const Nutrition = require('./Nutrition');

// create assiociations

// One to many relationship
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// one to one relationship
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

// Don't need to access Post through Comment
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onabort: 'SET NULL',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Workout.belongsToMany(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Nutrition.belongsToMany(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

User.hasMany(Nutrition, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});


module.exports = { Post, User, Comment, Workout, Nutrition  };































// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
