const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Workout extends Model {}

Workout.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    servingSize: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
   userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user', 
      key: 'id',
    },
  },
},
{
  sequelize,
  modelName: 'workout',
}
);


module.exports = Workout;