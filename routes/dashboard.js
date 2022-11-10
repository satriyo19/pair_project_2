const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/:id',Controller.renderDashboard)

module.exports = router