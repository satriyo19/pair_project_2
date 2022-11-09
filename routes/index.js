const router = require('express').Router();
const Controller = require('../controllers/controller');
let login = require('./login');
let register = require('./register');

router.get('/',Controller.renderLogin)

router.use('/login', login)
router.use('/register', register)


module.exports = router