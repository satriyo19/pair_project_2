const Admin = require('../../controllers/admin');
const router = require('express').Router();

router.get('/:id', Admin.renderAdminPage)


module.exports = router