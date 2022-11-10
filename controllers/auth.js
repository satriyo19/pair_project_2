const {Post, Profile, Tag, User} = require('../models/index')
const nodemailer = require('../helpers/nodeMailer')
const bcrypt = require('bcryptjs');


class Auth{
    static renderLogin(req, res){
        res.render('auth/login')
    }

    static handlerLogin(req, res){
        const {email, password} = req.body
        let option = {
            where: {
                email: email
            }
        }
        // console.log(email)

        User.findOne(option)
            .then(user => {
                if(user){
                    let isValidPassword = bcrypt.compareSync(password, user.password)
                    if(isValidPassword) res.redirect(`/dashboard/${user.id}`)
                    else res.redirect(`/login?error=Invalid Password`)
                }
                else res.redirect(`/login?error=Email Tidak Ditemukan`)
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
                nodemailer(email)
                res.redirect('/login')
            })
            .catch(err => res.send(err))
    }


}

module.exports = Auth