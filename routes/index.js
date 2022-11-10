const Auth = require('../controllers/auth');
const router = require('express').Router();
const login = require('./auth/login');
const register = require('./auth/register');
const dashboard = require('./dashboard');
const post = require('./posts')
const profile = require('./profile')


router.get('/',Auth.renderLogin)

router.use('/register', register)
router.use('/login', login)
router.use('/dashboard', dashboard)
router.use('/profile', profile)
router.use('/post', post)


module.exports = router