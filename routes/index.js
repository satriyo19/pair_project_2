const Auth = require('../controllers/auth');
const router = require('express').Router();
let login = require('./auth/login');
let register = require('./auth/register');
let dashboard = require('./dashboard');
let post = require('../routes/posts')


router.get('/',Auth.renderLogin)

router.use('/register', register)
router.use('/login', login)
router.use('/dashboard', dashboard)
router.use('/post', post)


module.exports = router