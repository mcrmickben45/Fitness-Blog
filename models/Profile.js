module.exports = function (sequelize, DataTypes) {
  const Profile = sequelize.define('Profile', {
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    socialLinks: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User);
  }; 
    
  return Profile;
};
