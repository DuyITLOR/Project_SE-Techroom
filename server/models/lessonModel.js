import { DataTypes } from 'sequelize';
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
      primaryKey: true,
    },
    SessionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    RoomID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'Lesson',
    timestamps: false,
  }
);

Lesson.addLesson = async function (classID, date, sessionNumber, roomID) {
  try {
    const parentClass = await Class.findByPk(classID);
    if (!parentClass) {
      throw new Error(`Class with ID ${classID} does not exist.`);
    }

    const newLesson = await Lesson.create({
      ClassID: classID,
      Date: date,
      SessionNumber: sessionNumber,
      RoomID: roomID,
    });

    const studentInClass = await parentClass.getParticipatedUser();

    await newLesson.setStudentsAttending(studentInClass);

    console.log(`Lesson added successfully with ID: ${newLesson.LessonID}`);
    return newLesson;
  } catch (error) {
    console.error('Error adding lesson:', error);
    throw error;
  }
};

Lesson.deleteLesson = async function (lessonID) {
  try {
    const lesson = await Lesson.findByPk(lessonID);
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonID} does not exist.`);
    }
    await lesson.destroy();
    console.log(`Lesson with ID ${lessonID} and its attendance records deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting lesson with ID ${lessonID}:`, error);
    throw error;
  }
};

Lesson.updateLesson = async function (lessonID, updatedInfo) {
  try {
    const lesson = await Lesson.findByPk(lessonID);
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonID} does not exist.`);
    }

    if (updatedInfo.lessonData) {
      result = await lesson.update(updatedInfo.lessonData);
      console.log(`Lesson with ID ${lessonID} updated successfully.`);
    }

    if (updatedInfo.studentIDs) {
      const students = await Accounts.findAll({
        where: { UserID: updatedInfo.studentIDs },
      });
      await Lesson.setStudentsAttending(students);
      console.log(`Students list updated for lesson with ID ${lessonID}.`);
    }

    return result;
  } catch (error) {
    console.error(`Error updating lesson ${LessonID}:`, error);
    throw error;
  }
};

// Lesson.getAllLessonsForWeek() = async function (UserID, weekStartDate) {
//   try {
    
//   } catch (error) {
    
//   }
// }

export { Lesson, Session };
