const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' 
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
