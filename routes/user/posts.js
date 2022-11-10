const router = require('express').Router();
const Controller = require('../../controllers/user');

router.get('/add/:id', Controller.addPostForm)
router.post('/add/:id', Controller.addNewPost)
router.get('/:id/edit/:postId', Controller.editPostForm)
router.post('/:id/edit/:postId', Controller.editPost)
router.get('/:id/delete/:postId', Controller.deletePost)

module.exports = router
