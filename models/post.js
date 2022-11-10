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
    content: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate : {
        notNull: {
          msg:`Kasih spill dikit lah kak`
        },
        notEmpty : {
          msg:`Kasih spill dikit lah kak`
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    TagId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};