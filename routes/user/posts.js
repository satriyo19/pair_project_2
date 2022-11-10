const router = require('express').Router();
const Controller = require('../../controllers/user');

router.get('/add', Controller.addPostForm)
router.post('/add', Controller.addNewPost)
router.get('/edit/:postId', Controller.editPostForm)
router.post('/edit/:postId', Controller.editPost)

module.exports = router
