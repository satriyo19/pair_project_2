const Controller = require('../../controllers/user');
const router = require('express').Router();

router.get('/', Controller.renderAdmin)


module.exports = router