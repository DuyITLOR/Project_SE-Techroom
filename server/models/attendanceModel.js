import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { Lesson } from './lessonModel.js';

const Attendance = sequelize.define(
  'Attendance',
  {
    UserID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    LessonID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    isAbsent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      primaryKey: false,
    },
    isLate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      primaryKey: false,
    },
  },
  {
		tableName: 'Attendance',
		timestamps: false
	}
);

export {Attendance}
