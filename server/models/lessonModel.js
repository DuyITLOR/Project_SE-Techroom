import { DataTypes, Op } from 'sequelize';
import sequelize from '../config/db.js';
import Accounts from './accountModel.js';
import Class from './classModel.js';
import { Attendance } from './attendanceModel.js';

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
    uniqueKeys: {
      uniqueTimePlace: {
        fields: ['Date', 'SessionNumber', 'RoomID'],
      },
    },
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

    let result = null;

    const newLesson = await Lesson.create({
      ClassID: classID,
      Date: date,
      SessionNumber: sessionNumber,
      RoomID: roomID,
    });

    const userInClass = await parentClass.getParticipatedUsers();

    await newLesson.setUsersAttending(userInClass);

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

    let result = null;

    if (updatedInfo.lessonData) {
      result = await lesson.update(updatedInfo.lessonData);
      console.log(`Lesson with ID ${lessonID} updated successfully.`);
    }

    if (updatedInfo.studentIDs) {
      const students = await Accounts.findAll({
        where: { UserID: updatedInfo.studentIDs },
      });
      await Lesson.setUsersAttending(students);
      console.log(`Students list updated for lesson with ID ${lessonID}.`);
    }

    if (updatedInfo.teacherIDs) {
      const teachers = await Accounts.findAll({
        where: { UserID: updatedInfo.teacherIDs },
      });
      await Lesson.setUsersAttending(teachers);
      console.log(`Teachers list updated for lesson with ID ${lessonID}.`);
    }

    return result;
  } catch (error) {
    console.error(`Error updating lesson ${lessonID}:`, error);
    throw error;
  }
};

Lesson.getAllLessonsForWeek = async function (weekStartDate) {
  try {
    const lessons = Lesson.findAll({
      where: {
        Date: {
          [Op.gte]: weekStartDate,
          [Op.lt]: new Date(weekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days later
        },
      },
    });

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons for the week:', error);
    throw error;
  }
};

Lesson.getRelatedLessonsForWeek = async function (userID, weekStartDate) {
  try {
    const lesson = Lesson.findAll({
      include: [
        {
          model: Accounts,
          as: 'UsersAttending',
          where: { UserID: userID },
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        Date: {
          [Op.gte]: weekStartDate,
          [Op.lt]: new Date(weekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days later
        },
      },
    });

    console.log(`Successfully fetched lessons related to user ${userID} for the week.`);
    return lesson;
  } catch (error) {
    console.error('Error fetching related lessons for the week:', error);
    throw error;
  }
};

Lesson.getLessonDetails = async function (LessonID) {
  try {
    const lesson = Lesson.findByPk(LessonID, {
      include: [
        {
          model: Accounts,
          as: 'Student',
          through: {
            attributes: [],
          },
          where: {
            Role: 'student',
          },
          required: false,
        },
        {
          model: Accounts,
          as: 'Teacher',
          through: {
            attributes: [],
          },
          where: {
            Role: 'teacher',
          },
          required: false,
        },
      ],
    });

    if (!lesson) {
      throw new Error(`Lesson with ID ${LessonID} does not exist.`);
    }

    console.log(`Successfully fetched details for lesson with ID ${LessonID}.`);
    return lesson;
    
  } catch (error) {
    console.error(`Error fetching details for lesson with ID ${LessonID}:`, error);
    throw error;
  }
};
export { Lesson, Session };
