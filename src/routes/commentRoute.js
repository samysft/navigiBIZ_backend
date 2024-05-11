const express = require('express');
const router = express.Router();
const { addComment, getCommentsForPost } = require('../controllers/commentController');

// Endpoint to add a comment
router.post('/comments', addComment);


module.exports = router ;