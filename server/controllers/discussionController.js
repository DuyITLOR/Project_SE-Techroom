import Post from "../models/postModel.js";
import fs from "fs";
import path from "path";

export const getDiscussion = async (req, res) => {
  const { classID } = req.query;
  if (!classID) {
    return res.status(400).send({
      success: false,
      message: "Class ID cannot be empty Quoc!",
    });
  }
  try {
    const posts = await Post.getAllPost(classID);
    if (posts.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No discussions found for this class.",
      });
    }
    return res.status(200).send({
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.error("Error retrieving discussions:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while retrieving discussions.",
    });
  }
};

export const createPost = async (req, res) => {
  const { classID, userID, content } = req.body;
  if (!userID || !content) {
    return res.status(400).send({
      success: false,
      message: "user ID and content cannot be empty!",
    });
  }
  try {
    const link = req.file ? req.file.path : null;
    const newPost = await Post.addPost(classID, userID, content, link);
    return res.status(201).send({
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).send({
      success: false,
      message: "Wrong input.",
    });
  }
};

export const deletePost = async (req, res) => {
  const { postID } = req.body;
  if (!postID) {
    return res.status(400).send({
      success: false,
      message: "Post ID cannot be empty!",
    });
  }
  try {
    const result = await Post.deletePost(postID);
    if (result == 0) {
      return res.status(404).send({
        success: false,
        message: "Post not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while deleting the post.",
    });
  }
};

export const updatePost = async (req, res) => {
  const { postID, content } = req.body;
  const link = req.files ? req.files.map((file) => file.path).join(",") : null;
  if (!postID || !content) {
    return res.status(400).send({
      success: false,
      message: "Post ID and content cannot be empty!",
    });
  }
  try {
    const post = await Post.editPost(postID, content, link);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found!",
      });
    }
    return res.status(200).send({
      success: true,
      post: post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while updating the post.",
    });
  }
};
export const downloadFile = (req, res) => {
  try {
    const { filename } = req.query; // lấy tên file từ body

    // Đường dẫn tuyệt đối đến file trong thư mục public
    const filePath = path.join(process.cwd(), "public", filename);

    // Kiểm tra file có tồn tại không
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File không tồn tại" });
    }

    // Gửi file về cho client (tải về)
    return res.download(filePath, filename);
    // nếu muốn hiển thị trực tiếp thì dùng: res.sendFile(filePath);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Lỗi khi tải file", error: err.message });
  }
};
export default {
  getDiscussion,
  createPost,
  deletePost,
  updatePost,
  downloadFile,
};
