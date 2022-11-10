const {Post, Profile, Tag, User} = require('../models/index')
const nodemailer = require('../helpers/nodeMailer')
const bcrypt = require('bcryptjs');

class Auth{
    static renderLogin(req, res){
        let {errors} = req.query
        // console.log(errors)
        if(errors) errors = errors.split(',')
        if(req.session.idUser) res.redirect(`/dashboard/${req.session.idUser}`)
        else res.render('auth/login', {errors})
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
                    if(isValidPassword) {
                        req.session.idUser = user.id
                        if(user.role === "admin") return res.redirect(`/admin/${user.id}`)
                        if(user.role === "user") return res.redirect(`/dashboard/${user.id}`)
                        // console.log(req.session)
                        
                    }
                    else{
                        let errPassword = 'Invalid Password'
                        return res.redirect(`/login?errors=${errPassword}`)
                    }
                }
                else return res.redirect(`/login?errors=Email Tidak Ditemukan`)
            })
            .catch(err => {
                err = err.errors.map(el => {
                    return el.message
                })
                res.redirect(`/login?errors=${err}`)
            })
    }


    static renderRegister(req, res){
        let {errors} = req.query
        // console.log(errors)
        if(errors) errors = errors.split(',')
        res.render('auth/createAccount', {errors})
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
            .catch(err => {
                err = err.errors.map(el => {
                    return el.message
                })
                res.redirect(`/register?errors=${err}`)
            })
    }
    
    static renderLogout(req,res){
        req.session.destroy((err) => {
            if(err)res.send(err)
            else{
                res.redirect('/login')
            }
        })
    }

}

module.exports = Auth