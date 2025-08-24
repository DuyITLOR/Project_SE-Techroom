import { DataTypes, Op, QueryTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Accounts from './accountModel.js';
import Class from './classModel.js';


const Session = sequelize.define(
  'Session',
  {
    SessionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    StartTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    EndTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: 'Session',
    timestamps: false,
  }
);

const Lesson = sequelize.define(
  'Lesson',
  {
    LessonID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ClassID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: false,
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: false,
    },
    SessionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    RoomID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    uniqueKeys: {
      uniqueTimePlace: {
        fields: ['Date', 'SessionNumber', 'RoomID'],
      },
    },
    tableName: 'Lesson',
    timestamps: false,
  }
);

Lesson.getClassNotInTimetable = async function () {
  const [results] = await sequelize.query(
    `
    SELECT DISTINCT p.ClassID
    FROM Participation p
    LEFT JOIN Lesson l ON p.ClassID = l.ClassID
    WHERE l.ClassID IS NULL
    `
  );

  if (!results.length) {
    return {
      success: false,
      message: "all classes are available in timetable"
    };
  }

  return {
    success: true,
    result: results
  }

}

export { Lesson, Session };
