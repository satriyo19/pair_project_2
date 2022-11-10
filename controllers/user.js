const { Post, User, Tag, Profile } = require('../models')
const { Op } = require('sequelize')
const timeAgo = require('../helpers/timeAgo')
class Controller {
    static renderDashboard(req, res) {
        const { id } = req.params
        const { search, sort } = req.query
        const { where } = !search ? { where: {} } : { where: { title: { [Op.iLike]: `%${search}%` } } }
        let dataPost, dataUser
        Post.findAll({
            include: Tag,
            where,
            order: [[! sort ? 'createdAt' : sort,'asc']]
        })
            .then(data => {
                dataPost = data
                return User.findAll({
                    include: Profile,
                })
            })
            .then(data => {
                dataUser = data
                res.render('user/dashboardPage', { dataPost, dataUser, id, timeAgo})
            })
            .catch(err => res.send(err))
    }

    static addPostForm(req, res) {
        const { id } = req.params
        Tag.findAll()
            .then(data => res.render('user/addPost', { data, id }))
            .catch(err => res.send(err))
    }

    static addNewPost(req, res) {
        const { id } = req.params
        const { title, content, imgUrl, TagId } = req.body
        Post.create({
            title, content, imgUrl, UserId: id, TagId
        })
            .then(() => res.redirect(`/dashboard/${id}`))
            .catch(err => res.send(err))
    }

    static editPostForm(req, res) {
        const { id } = req.params
        const { postId } = req.params
        let dataPost;
        Post.findById(postId)
            .then((data) => {
                dataPost = data
                return Tag.findAll()
            })
            .then((data) => res.render('user/editPost', { data, dataPost, id }))
            .catch(err => res.send(err))

    }

    static editPost(req, res) {
        const { id, postId } = req.params
        const { title, content, imgUrl, TagId } = req.body
        Post.update({
            title,
            content,
            imgUrl,
            TagId,
            UserId: id
        }, {
            where: {
                id: postId
            }
        })
            .then(() => res.redirect(`/dashboard/${id}`))
    }

    static deletePost(req, res) {
        const { id, postId } = req.params
        let deleted;
        Post.findById(postId)
            .then((data) => {
                deleted = data
                return Post.destroy({
                    where: {
                        id: postId
                    }
                })
            })
            .then(() => res.redirect(`/dashboard/${id}`))
            .catch(err => res.send(err))
    }

    static renderProfilePage(req, res) {
        const { id } = req.params
        Profile.findOne({
            where: {
                UserId: id
            }
        })
            .then(data => res.render('profile', { data }))
            .catch(err => res.send(err))
    }
}

module.exports = Controller