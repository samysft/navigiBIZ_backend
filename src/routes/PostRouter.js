const express = require('express');
const router = express.Router();

const {  createPostForCompany ,
    modifyPostForCompany,
    deletePostForCompany ,
    getCommentsForPost,
    getAllPosts,
    getCompanyPosts
} = require('../controllers/companyPostController');


// Define route for handling GET request for '/'
router.get('/', getCompanyPosts);

// router.get('/home',getCompaniesprofiles);


// Endpoint to create a post for a company
router.post('/company/:companyId/posts',createPostForCompany);

// Endpoint to modify a post for a company
router.put('/company/:companyId/posts/:postId', modifyPostForCompany);

// Endpoint to delete a post for a company
router.delete('/company/:companyId/posts/:postId', deletePostForCompany);

router.get('/:postId/comments', getCommentsForPost);
router.get('/company/:companyId', getAllPosts);

module.exports = router;
