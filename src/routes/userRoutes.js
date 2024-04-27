// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
