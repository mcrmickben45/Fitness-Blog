module.exports = function (sequelize, DataTypes) {
  const Nutrition = sequelize.define('Nutrition', {
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    fats: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    fiber: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    sugar: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    servings: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
  });

  Nutrition.associate = (models) => {
    Nutrition.belongsTo(models.User);
  };

  return Nutrition;
};


