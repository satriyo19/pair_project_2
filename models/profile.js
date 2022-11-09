'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    location: DataTypes.STRING,
    contact: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};