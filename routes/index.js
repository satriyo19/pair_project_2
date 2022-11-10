const Auth = require('../controllers/auth')
const router = require('express').Router();
const Controller = require('../controllers/controller');
let login = require('./auth/login');
let register = require('./auth/register');
let dashboard = require('./dashboard');
let post = require('./posts')

router.get('/',Auth.renderLogin)

router.use('/login', login)
router.use('/register', register)
router.use('/dashboard', dashboard)
router.use('/post', post)


module.exports = router