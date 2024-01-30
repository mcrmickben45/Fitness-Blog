const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'an0g5pgtn7w5p08t',
  password: 'mbfoxq1aic0i8kdv',
  database: 'fitness_blog_db',
});

const BlogPost = require('./BlogPost')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);
const Nutrition = require('./Nutrition')(sequelize, DataTypes);
const Profile = require('./Profile')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Workout = require('./Workout')(sequelize, DataTypes);

User.hasMany(BlogPost);
User.hasMany(Comment);
User.hasOne(Profile);
User.hasMany(Workout);
User.hasMany(Nutrition);

// Initialize models
const models = {
  User,
  BlogPost,
  Comment,
  Nutrition,
  Profile,
  Workout,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced successfully');
});
