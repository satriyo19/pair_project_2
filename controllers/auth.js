const {Post, Profile, Tag, User} = require('../models/index')

class Auth{
    static renderLogin(req, res){
        res.render('auth/login')
    }

    static handlerLogin(req, res){
        const {email, password} = req.body

        User.findOne( {email: email} )
            .then(user => {
                if(user){
                    res.redirect(`/dashboard/${user.id}`)
                }
            })
    }

    static renderRegister(req, res){
        res.render('auth/createAccount')
    }

    static handlerRegister(req, res){
        let {firstName, lastName, location, contact, email, password, username} = req.body
        let idUser;

        User.create({username, email, password, role: 'user'})
            .then(data => {
                idUser = data.id
                return Profile.create({firstName, lastName, location, contact, UserId: idUser})
            })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => res.send(err))
    }


}

module.exports = Auth