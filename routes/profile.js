const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/:id',Controller.renderProfilePage)

module.exports = router