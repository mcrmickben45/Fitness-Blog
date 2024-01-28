const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 50]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Hash the password before saving it to the database
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      },
    },
  });
  
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };


  // Associations
  User.associate = (models) => {
  User.hasMany(models.BlogPost);
  User.hasMany(models.Comment);
  User.hasOne(models.Profile);
  User.hasMany(models.Workout);
  User.hasMany(models.Nutrition);
  };

  return User;
};