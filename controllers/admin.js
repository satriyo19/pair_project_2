const { Profile, User, Post, Tag, sequelize } = require('../models')

class Admin {
  static renderAdminPage(req, res) {
    const { id } = req.params
    let dataAdmin, dataProfile;
    User.findOne({
      where: {
        id: id
      }
    })
      .then(data => {
        dataAdmin = data
        return Profile.findAll({
          include: {
            model : User,
            include : {
              model : Post,
            },
            where : {
              role : 'user'
            }
          },
        })
      })
      .then(data => {
        dataProfile = data
        res.render('adminPage', {dataProfile, dataAdmin })
      })
      .catch(err => res.send(err))
  }
}

module.exports = Admin