const Comment = require('../models/commentModel');

exports.addComment = async (req, res) => {
  try {
    const { text, userId, postId, rating } = req.body; // Include rating from the request body
    const newComment = await Comment.create({ text, userId, postId, rating });
    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
