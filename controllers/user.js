const { Post, User, Tag, Profile } = require('../models')
class Controller {

    static renderDashboard(req, res) {
        const { id } = req.params
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
                res.render('user/dashboardPage', { dataPost, dataUser, id })
            })
            .catch(err => res.send(err))
    }

    static addPostForm(req, res) {
        const { userId } = req.params
        Tag.findAll()
            .then(data => res.render('user/addPost', { data, userId }))
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
            .then((data) => res.render('user/editPost', { data, dataPost }))
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