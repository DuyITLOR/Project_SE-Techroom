import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Attendance = sequelize.define(
  'Attendance',
  {
    StudentID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
    },
    SessionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    RoomID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
