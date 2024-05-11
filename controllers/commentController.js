const Comment = require('../models/commentModel');

exports.addComment = async (req, res) => {
  try {
    const { text, userId, postId } = req.body;
    const newComment = await Comment.create({ text, userId, postId });
    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
