
// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   photo: {
//     type: object, 
//     required: true
//   },
//   company: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model (company)
//     required: true
//   }
// });


// // Create and export the model
// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String, 
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
    required: true
  }
});

// Create and export the model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
