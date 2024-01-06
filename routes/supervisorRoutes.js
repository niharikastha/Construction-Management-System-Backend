const express = require('express');
const supervisorController = require('../controller/supervisorController');
const authTokenRequired = require('../middlewares/authTokenRequired');
const router = express.Router();

router.post('/addSupervisor', [authTokenRequired.verifyToken, supervisorController.addSupervisor])
router.get('/getSupervisor', [authTokenRequired.verifyToken, supervisorController.getAllSupervisor])
router.patch('/updateSupervisor/:Id', [authTokenRequired.verifyToken, supervisorController.updateSupervisor])
router.delete('/deleteSupervisor/:Id', [authTokenRequired.verifyToken, supervisorController.deleteSupervisor])


module.exports = router;