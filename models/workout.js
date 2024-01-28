module.exports = function (sequelize, DataTypes) {
    const Workout = sequelize.define('Workout', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255]
        }
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      intensity: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: true
      },
      caloriesBurned: {
        type: DataTypes.INTEGER,
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
      // Additional fields
      distance: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0
        }
      },
      repetitions: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0
        }
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0
        }
      },
    });
  
    // Associations
    Workout.associate = (models) => {
    Workout.belongsTo(models.User);
    };
    
    return Workout;
  };