'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User)
      Post.belongsTo(models.Tag)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
    TagId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};