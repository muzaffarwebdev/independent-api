// routes/blogRoutes.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/auth');
const {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getMyBlogs
} = require('../controllers/blogController');
 
const blogValidation = require('../middleware/blogValidation');

// Public routes
router.get('/', getBlogs);
router.get('/my', authenticateToken, getMyBlogs);  
router.get('/:id', getBlogById);

// Protected routes (auth required)
router.post('/', authenticateToken, blogValidation, createBlog);        
router.patch('/:id', authenticateToken, blogValidation, updateBlog);    
router.delete('/:id', authenticateToken, deleteBlog);  
module.exports = router;