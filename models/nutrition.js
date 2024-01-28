const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Nutrition extends Model {}

Nutrition.init(
  {
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nutrients: {
      type: DataTypes.JSON, 
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, 
      },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User', 
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'nutrition',
    }
  );
  

module.exports = Nutrition;