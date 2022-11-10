const { Profile, User, Post, Tag, sequelize } = require('../models')

class Admin {
  static renderAdminPage(req, res) {
    const { id } = req.params
    // let option = {
    //   include: [{model: Profile}, {model: Post}]
    // }
    let option = {
      include: {
        model: User,
        include:{
          model:Post
        }
      }
    }
    // let dataAdmin, dataProfile;

    // User.findAll(option)
    Profile.findAll(option)
      .then(data => {
        res.render('admin/adminPage', {data})
        // console.log(data)
        // res.send(data)
      })
      .catch(err => res.send(err))
  }
}

module.exports = Admin