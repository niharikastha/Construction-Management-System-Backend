const express = require('express');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const addProjectRoutes =require('./projectManagerRoutes');
const constructorRoutes = require('./constructorRoutes');
const supervisorRoutes = require('./supervisorRoutes');


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

//use for projector
router.use('/user',addProjectRoutes);

//use for constructor 
router.use('/user',constructorRoutes);

//use for supervisor
router.use('/user',supervisorRoutes);


module.exports = router;
