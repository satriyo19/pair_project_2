const Auth = require('../../controllers/auth');
const router = require('express').Router();

router.get('/', Auth.renderRegister)
router.post('/', Auth.handlerRegister)

module.exports = router