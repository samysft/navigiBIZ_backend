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
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null  
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
