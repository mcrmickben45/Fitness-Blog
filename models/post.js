const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id,
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id,
                },
                include: [
                    {
                        model: models.Comment,
                        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                        include: {
                            model: models.User,
                            attributes: ['username']
                        }
                    }
                ]
            });
        });
    } 
}

Post.init(
    {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          commentsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          postCreatorUsername: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
      {
        sequelize,
        modelName: 'post',
      }
    );
    
    module.exports = Post;