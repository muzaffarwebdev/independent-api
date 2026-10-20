// service/blogService.js
const blogRepository = require('../repositories/blogRepository');

const createBlog = async (blogData) => {
    return blogRepository.createBlog(blogData);
};

const getBlogs = async () => {
    return blogRepository.findAll();
}

const getBlogById = async (id)  => {
    return blogRepository.findBlogById(id);
}

const updateBlog = async(blogId, userId, updateData) => {
    const blog = await blogRepository.findBlogById(blogId);

    if(!blog) {
        throw new Error ('Blog not found');
    }

    if(!blog.author || blog.author.toString() !== userId) {
        throw new Error("You cannot update this blog")
    }

    return blogRepository.updateById(blogId, updateData);
};

const deleteBlog = async(id) => {
    const blog = await blogRepository.findBlogById(blogId);

    if(!blog) {
        throw new Error ("Blog not found");
    }

    if(!blog.author || blog.author.toString() !== userId) {
        throw new Error("You cannot delete this blog")
    }

    return blogRepository.deleteBlog(blogId)
}

const getMyBlogs = async (userId) => {
    return blogRepository.findMyBlogs(userId);
}

module.exports = { 
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getMyBlogs
}