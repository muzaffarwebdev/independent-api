// models/blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [150, "Title too long"]
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            minlength: [10, "Content must be at least 10 characters"]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,         
        }
    },
    { timestamps: true }          
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;