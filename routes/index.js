const Auth = require('../controllers/auth');
const router = require('express').Router();
let login = require('./auth/login');
let register = require('./auth/register');
let dashboard = require('./user/dashboard');
let post = require('./user/posts')
let logout = require('./auth/logout');
const profile = require('./user/profile')
const  admin = require('./admin/admin')


router.get('/',Auth.renderLogin)

router.use('/register', register)

router.use('/login', login)

const isLogin = function(req, res, next) {
    if(!req.session.idUser){
        const error = 'Please Login'
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
}

router.use(isLogin)
router.use('/admin',admin)
router.use('/dashboard', dashboard)
router.use('/profile', profile)
router.use('/post', post)
router.use('/logout', logout)


module.exports = router