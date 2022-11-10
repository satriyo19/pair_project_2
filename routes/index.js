const router = require('express').Router();
const Controller = require('../controllers/controller');
let login = require('./login');
let register = require('./register');
let dashboard = require('./dashboard');
let post = require('../routes/posts')

router.get('/',Auth.renderLogin)

router.use('/login', login)
router.use('/register', register)
router.use('/dashboard', dashboard)
router.use('/post', post)


module.exports = router