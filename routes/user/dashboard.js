const router = require('express').Router();
const Controller = require('../../controllers/user');

router.get('/:id',Controller.renderDashboard)

module.exports = router