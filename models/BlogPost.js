// models/BlogPost.js
module.exports = function (sequelize, DataTypes) {
    const BlogPost = sequelize.define('BlogPost', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255]
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // Add more fields as needed
    });
  
    // Associations
    BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User);
    BlogPost.hasMany(models.Comment);
    };

    return BlogPost;
  };