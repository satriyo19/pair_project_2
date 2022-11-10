const router = require('express').Router()
const Controller = require('../../controllers/user')

router.get('/:id',Controller.renderProfilePage)

module.exports = router