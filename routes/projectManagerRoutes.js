const express = require('express');
const userController = require('../controller/userController');
const authTokenRequired = require('../middlewares/authTokenRequired');
const upload = require('../middlewares/upload');
const router = express.Router();
//api/user/addProject
router.get('/getProject',[authTokenRequired.verifyToken, userController.getAllProject]);
router.post('/addProject',[authTokenRequired.verifyToken,upload.single("picture"), userController.addProject]);
router.patch('/updateProject/:projectId',[authTokenRequired.verifyToken,userController.updateProject]);
router.delete('/deleteProject/:projectId',[authTokenRequired.verifyToken, userController.deleteProject]);


module.exports = router;