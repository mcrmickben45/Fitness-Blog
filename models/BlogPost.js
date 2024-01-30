module.exports = function (sequelize, DataTypes) {
  const BlogPost = sequelize.define('BlogPost', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User);
    BlogPost.hasMany(models.Comment);
  };

  return BlogPost;
};
