const Auth = require('../../controllers/auth');
const router = require('express').Router();

router.get('/', Auth.renderLogin)
router.post('/', Auth.handlerLogin)
router.get('/google', Auth.loginGoogle)


module.exports = router