const { Profile, User } = require('../models')

class Admin {
  static renderAdminPage(req, res) {
    const { id } = req.params
    let dataAdmin;
    User.findOne({
      where: {
        id: id
      }
    })
      .then(data => {
        dataAdmin = data
        return Profile.findAll()
      })
      .then(data => res.render('adminPage', { data, dataAdmin }))
  }
}

module.exports = Admin