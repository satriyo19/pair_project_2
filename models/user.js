'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {foreignKey: 'UserId'})
      User.hasMany(models.Post)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate : {
        notNull:true,
        notEmpty:{
          msg:'Username cant be empty'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate : {
        notNull:true,
        notEmpty:{
          msg:'Password cant be empty'
        },
        len : {
          args : 8,
          msg : `Minimal password 8 character`
        }
      }
    },
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