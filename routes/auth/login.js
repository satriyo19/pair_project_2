const Auth = require('../../controllers/auth');
const router = require('express').Router();

router.get('/', Auth.renderLogin)
router.post('/', Auth.handlerLogin)


module.exports = router