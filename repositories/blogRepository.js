// repositories/blogRepository.js
const Blog = require('../models/blog');

const findAll = async() => {
    return Blog.find();
}

const findBlogById = async(id) => {
    return await Blog.findById(id);
};

const createBlog = async(blogData) => {
    return Blog.create(blogData);
}

const updateById = async (blogId, blogData) => {
    return Blog.findByIdAndUpdate(
        blogId,
        blogData,
        {
            new: true,
            runValidators: true
        }
    );
}

const deleteBlog = async(id) => {
    return await Blog.findByIdAndDelete(id)
}

const findMyBlogs = async(userId) => {
    return Blog.find({ author: userId });
}
 
module.exports = { 
    findAll,
    findBlogById,
    createBlog,
    updateById,
    deleteBlog,
    findMyBlogs
};