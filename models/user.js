'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }

    static getProfile(){
      let option = {
        include : {
          model : Profile
        }
      }

      return User.findAll(option)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(data => {
    const salt = bcrypt.genSaltSync(6);
    const hash = bcrypt.hashSync(data.password, salt);
    console.log(data.password, hash)
    data.password = hash
  })
  return User;
};