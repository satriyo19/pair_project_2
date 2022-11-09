const Controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/', Controller.renderRegister)


module.exports = router