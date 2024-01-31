module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.BlogPost);
  };

  return Comment;
};


