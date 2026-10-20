//controllers/blogControllers.js
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const blogService = require('../services/blogService');

const getBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getBlogs();
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

const getBlogById = async(req, res) => {
    try {

        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blog ID"
        });
    }
        const blog = await blogService.getBlogById(id);

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

        const blog = await blogService.createBlog({
            title,
            content,
            author: req.user.userId,
        });

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
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.userId;

        const updateData = {};

        if(title !== undefined) {
            updateData.title = title;
        }

        if(content !== undefined) {
            updateData.content = content;
        }

        const updatedBlog = await blogService.updateBlog(
            id,
            userId,
            updateData
        );

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog
        });
    } catch (error) {
        console.error('updateBlog error:', error);

        if (error.message === 'Blog not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        if (error.message === 'You cannot update this blog') {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }
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
        await blogService.deleteBlog(id, req.user.userId);

        res.status(200).json({ 
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        if (error.message === "Blog not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === "You are not allowed to delete this blog") {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }

        console.error('deleteBlog error', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const getMyBlogs = async(req, res) => {
    try {
        const blogs = await blogService.getMyBlogs(
        req.user.userId
    );

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