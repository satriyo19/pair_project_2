'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User ,{
        foreignKey: "UserId"
      })
      Post.belongsTo(models.Tag,{
        foreignKey: "TagId"
      })
    }

    static findById(id){
      return Post.findOne({
        where : {
          id : id
        }
      })
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate : {
        notNull:true,
        notEmpty :{
          msg:`Kasih judul dulu boss`
        }
      }
    },
    content: DataTypes.TEXT,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull:false,
      validate : {
        notNull:true,
      }
    },
    TagId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};