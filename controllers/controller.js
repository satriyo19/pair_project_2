const { Post, User, Tag, Profile } = require('../models')
class Controller {
    static renderLogin(req, res) {
        res.render('login')
    }

    static renderRegister(req, res) {
        res.render('createAccount')
    }

    static renderDashboard(req, res) {
        const { userId } = req.params
        let dataPost, dataUser
        Post.findAll({
            include: Tag
        })
            .then(data => {
                dataPost = data
                return User.findAll({
                    include: Profile,
                })
            })
            .then(data => {
                dataUser = data
                res.render('dashboardPage', { dataPost, dataUser, userId })
            })
            .catch(err => res.send(err))
    }

    static addPostForm(req, res) {
        const { userId } = req.params
        Tag.findAll()
            .then(data => res.render('addPost', { data, userId }))
            .catch(err => res.send(err))
    }

    static addNewPost(req, res) {
        const { userId } = req.params
        const { title, content, imgUrl, TagId } = req.body
        Post.create({
            title, content, imgUrl, UserId: userId, TagId
        })
            .then(() => res.redirect('/dashboard'))
            .catch(err => res.send(err))
    }

    static editPostForm(req, res) {
        const { userId, postId } = req.params
        let dataPost;
        Post.findOne({
            where: {
                id: postId
            }
        })
            .then((data) => {
                dataPost = data
                return Tag.findAll()
            })
            .then((data) => res.render('editPost', { data, dataPost }))
            .catch(err => res.send(err))

    }

    static editPost(req, res) {
        const { userId, postId } = req.params
        const { title, content, imgUrl, TagId } = req.body
        Post.update({
            title,
            content,
            imgUrl,
            TagId,
            UserId: userId
        }, {
            where: {
                id: postId
            }
        })
            .then(() => res.redirect('/dashboard'))
    }
}

module.exports = Controller