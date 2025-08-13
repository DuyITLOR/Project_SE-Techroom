import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

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

export { Post };
