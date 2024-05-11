
const express = require('express');
const router = express.Router();
const { signup, login, updateProfile } = require('../controllers/userController');



// Define routes
router.post('/signup', signup);

router.post('/login', login);

router.put('/profile/:userId', updateProfile);

// router.delete('/:userId', deleteUser);

// router.post('/logout', logout);

// router.delete('/:userId', deleteUser);

// Export router

module.exports = router;

