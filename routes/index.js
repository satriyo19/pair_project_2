const router = require('express').Router();
const Auth = require('../controllers/auth');
let login = require('./auth/login');
let register = require('./auth/register');

router.get('/',Auth.renderLogin)

router.use('/login', login)
router.use('/register', register)


module.exports = router