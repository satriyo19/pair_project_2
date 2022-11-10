const {Post, Profile, Tag, User} = require('../models/index')
const bcrypt = require('bcryptjs');


class Auth{
    static renderLogin(req, res){
        if(req.session.idUser) res.redirect(`/dashboard/${req.session.idUser}`)
        else res.render('auth/login')
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
                        // console.log(req.session)
                        return res.redirect(`/dashboard/${user.id}`)
                    }
                    else return res.redirect(`/login?error=${'Invalid Password'}`)
                }
                else return res.redirect(`/login?error=${'Email Tidak Ditemukan'}`)
            })
            .catch(err => console.log(err))
    }


    static renderRegister(req, res){
        res.render('auth/createAccount')
    }

    static handlerRegister(req, res){
        let {firstName, lastName, location, contact, email, password, username} = req.body
        let idUser;
        // console.log(firstName, lastName, location, contact, email, password, username)
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