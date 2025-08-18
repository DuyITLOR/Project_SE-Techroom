import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Tag = sequelize.define(
  'Tag',
  {
    TagID: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: false,
    },
    TagModel: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    tableName: 'Tag',
    timestamps: false,
  }
);

const Feedback = sequelize.define(
  'Feedback',
  {
    ClassID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    StudentID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    TeacherID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    Text: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      primaryKey: false,
    },
    TagID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'Feedback',
    timestamps: false,
  }
);

export { Feedback, Tag };
