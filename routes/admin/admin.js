const Admin = require('../../controllers/admin');
const router = require('express').Router();

router.get('/:id', Admin.renderAdminPage)
router.get('/:id/delete/:idDelete', Admin.renderDelete)


module.exports = router