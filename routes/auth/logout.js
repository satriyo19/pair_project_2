const Auth = require('../../controllers/auth');
const router = require('express').Router();

router.get('/', Auth.renderLogout)

module.exports = router