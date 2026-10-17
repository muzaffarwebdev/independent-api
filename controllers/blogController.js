//controllers/blogControllers.js
const Blog = require('../models/blog');
const mongoose = require('mongoose');

// get all 
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogs
        });   
    } catch (error) {
        console.error('getBlogs error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

// getBlogById
const getBlogById = async(req, res) => {
    try {

        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blog ID"
        });
    }
        const blog = await Blog.findById(req.params.id);

        if(!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        data: blog
    });
    } catch (error) {
        console.error('getBlogById error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

//createBlog
const createBlog = async(req, res) => {
    try {
        const { title, content } = req.body;  

        const blog = new Blog({
            title,
            content,
            author: req.user.userId,
        });
        await blog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        });
    } catch (error) {
        console.error('createBlog error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

//updateBlog
const updateBlog = async (req, res) => {
    try {

        const { title, content } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blog ID"
        });
    }

        // Find blog
        const blog = await Blog.findById(id);

        // Blog not found
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Ownership check
        if (!blog.author || blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this blog"
            });
        }

        // Update only provided fields
        if (title !== undefined) {
            blog.title = title;
        }

        if (content !== undefined) {
            blog.content = content;
        }

        // Save updated blog
        const updatedBlog = await blog.save();

            res.status(200).json({
                success: true,
                message: "Blog updated successfully",
                data: updatedBlog
            });
    } catch (error) {
        console.error('updateBlog error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};


//deleteBlog
const deleteBlog = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blog ID"
        });
    }

        const blog = await Blog.findById(id); // find blog by id

        if(!blog) {
            return res.status(404).json({ 
                success: false,
                message: "Blog not found",
            });
        }

        // ownership check
        if(!blog.author || blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false, 
                message: "You are not allowed to delete this blog",
            });
        }

        await Blog.findByIdAndDelete(id);

        res.status(200).json({ 
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error('deleteBlog error', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

//getMyBlogs
const getMyBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({
        author: req.user.userId
    });

    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: blogs
    });
    } catch (error) {
        console.error('getMyBlogs error', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

module.exports = { 
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getMyBlogs
};