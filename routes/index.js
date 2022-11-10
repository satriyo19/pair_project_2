const Auth = require('../controllers/auth');
const router = require('express').Router();
const login = require('./auth/login');
const register = require('./auth/register');
const dashboard = require('./dashboard');
const post = require('./posts')
const profile = require('./profile')
let logout = require('./auth/logout');


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
router.use('/dashboard', dashboard)
router.use('/profile', profile)
router.use('/post', post)
router.use('/logout', logout)


module.exports = router