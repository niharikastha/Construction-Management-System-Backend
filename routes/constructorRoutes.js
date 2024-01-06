const express = require('express');
const constructorController = require('../controller/constructorController');
const authTokenRequired = require('../middlewares/authTokenRequired');
const router = express.Router();

router.get('/getConstructor',[authTokenRequired.verifyToken, constructorController.getAllData])
router.post('/addConstructor', [authTokenRequired.verifyToken, constructorController.addConstructorController])
router.patch('/updateConstructor/:constructorId', [authTokenRequired.verifyToken, constructorController.updateConstructor])
router.delete('/deleteConstructor/:constructorId', [authTokenRequired.verifyToken, constructorController.deleteConstructor])


module.exports = router;