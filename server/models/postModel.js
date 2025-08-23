import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import fs from "fs";
import path from "path";

const Post = sequelize.define(
  'Post',
  {
    PostID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    ClassID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: false,
    },
    UserID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: false,
    },
    Content: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      primaryKey: false,
    },
    Link: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      primaryKey: false,
    },
    PostDate: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    tableName: 'Post',
    timestamps: false,
  }
);

// addPost(): Create a new post and add it to the database
Post.addPost = async function (classID, userID, content, link) {
  const post = await this.create({
    ClassID: classID,
    UserID: userID,
    Content: content,
    Link: link,
    PostDate: new Date(),
  });
  return post;
};

// deletePost(): Delete an existing post from the database
Post.deletePost = async function (postID) {
  const post = await this.findByPk(postID);
  if (!post) {
    return 0
  }
  // post.Link có thể null hoặc 1 chuỗi "path1,path2,..."
  if (post.Link) {
    // Tách chuỗi theo dấu phẩy, trim từng phần, loại bỏ phần rỗng
    const fileLinks = String(post.Link)
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const rawLink of fileLinks) {
      try {
        const filePath = path.join(process.cwd(), rawLink);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        // có thể ghi log ra file nếu muốn
      }
    }
  }
  await post.destroy();
  return 1
};

//getAllPost(): get all post from classID
Post.getAllPost = async function (classID) {
  return await this.findAll({
    where: {
      ClassID: classID,
    },
    order: [['PostDate', 'DESC']],
  });
};

//editPost(): Edit an existing post in the database
Post.editPost = async function (postID, content, link) {
  const post = await this.findByPk(postID);
  if (!post) {
    return null
  }
  content="Đã chỉnh sửa bài viết: "+content;
  post.Content = content;
  post.Link = link;
  post.PostDate = new Date();
  await post.save();
  return post
} 


export default Post ;
