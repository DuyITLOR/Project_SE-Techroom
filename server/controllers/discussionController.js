import Post from '../models/postModel.js';

export const getDiscussion = async (req, res) => {
    const { classID } = req.body;
    if (!classID) {
        return res.status(400).send({
            success: false,
            message: "Class ID cannot be empty!"
        });
    }
    try {
        const posts = await Post.getAllPost(classID);
        if (posts.length === 0) {
            return res.status(404).send({
                success: true,
                message: "No discussions found for this class."
            });
        }
        return res.status(200).send({
            success: true,
            posts: posts
        });
    } catch (error) {
        console.error("Error retrieving discussions:", error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while retrieving discussions."
        });
    }
}

export const createPost = async (req, res) => {
    const { classID,userID ,content, link } = req.body;
    if (!userID || !content) {
        return res.status(400).send({
            success: false,
            message: "user ID and content cannot be empty!"
        });
    }
    try {
        const newPost = await Post.addPost(classID,userID, content, link);
        return res.status(201).send({
            success: true,
            post: newPost
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).send({
            success: false,
            message: "Wrong input."
        });
    }
}

export const deletePost = async (req, res) => {
    const { postID } = req.body;
    if (!postID) {
        return res.status(400).send({
            success: false,
            message: "Post ID cannot be empty!"
        });
    }
    try {
        const result = await Post.deletePost(postID);
        if (result==0) {
            return res.status(404).send({
                success: false,
                message: "Post not found!"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Post deleted successfully!"
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while deleting the post."
        });
    }
}

export const updatePost = async (req, res) => {
    const { postID, content, link } = req.body;
    if (!postID || !content) {
        return res.status(400).send({
            success: false,
            message: "Post ID and content cannot be empty!"
        });
    }
    try {
        const post = await Post.editPost(postID, content, link);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: "Post not found!"
            });
        }
        return res.status(200).send({
            success: true,
            post: post
        });
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while updating the post."
        });
    }
}

export default {
    getDiscussion,
    createPost,
    deletePost,
    updatePost
}