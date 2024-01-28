// models/Comment.js
module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define('Comment', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      // Additional fields
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    });
  
    // Associations
    Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.BlogPost);
    };
    
    return Comment;
};