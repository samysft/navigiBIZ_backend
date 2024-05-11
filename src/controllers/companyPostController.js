const Post = require('../models/companyPost');
const User = require('../models/userModel');
const Comment = require('../models/commentModel'); 
//-
const createPostForCompany = async (req, res) => {
  try {
    const { title, description, photo } = req.body;
    const { companyId } = req.params;

    if (!title || !description || !photo) {
      return res.status(400).json({ message: 'Title, description, and photo are required' });
    }

    const newPost = await Post.create({
      title,
      description,
      date: new Date(),
      photo,
      company: companyId
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyPosts = async (req, res) => {
  try {
      // Retrieve up to 5 company posts from the database
      const posts = await CompanyPost.find().limit(5);

      // Send retrieved posts as JSON response
      res.json(posts);
// je pense na7iha hadi psk mknch mnha tkon error wla ???

  } catch (err) {
      // If an error occurs, send a 500 Internal Server Error response
      console.error('Error retrieving company posts', err);
      res.status(500).json({ error: 'Error retrieving company posts' });
  }
};
// Function to fetch comments for a post
const getCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId }).populate('userId');
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to create or modify a post for a company
const modifyPostForCompany = async (req, res) => {
  try {
    const { title, description, photo } = req.body;
    const { companyId } = req.params;
    const postId = req.params.postId;

    // Check if title, description, and photo are provided
    if (!title || !description || !photo) {
      return res.status(400).json({ message: 'Title, description, and photo are required' });
    }

    // Find the company by ID
    const company = await Company.findById(companyId);

    let newPost;

    // Check if postId is provided, indicating a modification of an existing post
    if (postId) {
      // Find the post by its ID
      let post = await Post.findById(postId);

      // Check if the post exists
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Update the post details
      post.title = title;
      post.description = description;
      post.photo = photo;

      // Save the updated post
      newPost = await post.save();
    } else {
      // Create a new post
      newPost = await Post.create({
        title,
        description,
        date: new Date(),
        photo,
        company: companyId
      });
    }

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a post for a company
const deletePostForCompany = async (req, res) => {
  try {
    const { companyId, postId } = req.params;

    // Check if postId is provided
    // if (!postId) {
    //   return res.status(400).json({ message: 'Post ID is required' });
    // }

    // Find the post by its ID
    const post = await Post.findOne({ _id: postId, company: companyId });

    // Check if the post exists
    // if (!post) {
    //   return res.status(404).json({ message: 'Post not found' });
    // }

    // Delete the post
    await post.remove();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createPostForCompany ,
  modifyPostForCompany,
  deletePostForCompany ,
  getCommentsForPost,
  getCompanyPosts,
  getAllPosts
};
