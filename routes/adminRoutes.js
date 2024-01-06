
const express = require('express');
const adminController = require('../controller/adminController');
const authTokenRequired = require('../middlewares/authTokenRequired')
const router = express.Router();

router.post('/addUser', [authTokenRequired.verifyToken,adminController.addUser]);


module.exports = router;
