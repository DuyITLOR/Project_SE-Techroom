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
  const startDate = new Date(weekStartDate);
  if (isNaN(startDate.getTime())) {
    throw new Error('Invalid date provided.');
  }

  const lessons = Lesson.findAll({
    where: {
      Date: {
        [Op.gte]: startDate,
        [Op.lt]: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days later
      },
    },
  });

  if (!lessons || lessons.length === 0) {
    console.log('No lessons found for the specified week.');
    throw new Error('No lessons found for the specified week.');
  }

  console.log(`Successfully fetched lessons for the week starting on ${weekStartDate}.`);
  return lessons;
};

Lesson.getRelatedLessonsForWeek = async function (userID, weekStartDate) {
  const start = new Date(weekStartDate);
  if (isNaN(start.getTime())) {
    throw new Error('Invalid date provided.');
  }
  
  const weekEndDate = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later

  const lessons = await sequelize.query(
    `
    select ls.*
    from Lesson ls
    join Attendance at on ls.LessonID = at.LessonID
    where at.UserID = :userID and ls.Date >= :weekStartDate and ls.Date < :weekEndDate`,
    {
      replacements: {
        userID: userID,
        weekStartDate: weekStartDate,
        weekEndDate: weekEndDate.toISOString().slice(0, 10),
      },
      type: QueryTypes.SELECT,
    }
  );

  if (!lessons || lessons.length === 0) {
    throw new Error(`No lessons found for user ${userID} for the week starting on ${weekStartDate}.`);
  }

  console.log(`Successfully fetched lessons related to user ${userID} for the week.`);
  return lessons;
};

Lesson.getLessonDetails = async function (lessonID) {
  const lesson = await Lesson.findByPk(lessonID);

  if (!lesson) {
    throw new Error(`Lesson with ID ${lessonID} does not exist.`);
  }

  // find students
  const studentList = await sequelize.query(
    `
    select a.UserID, a.FullName 
    from Accounts a 
    join Attendance at on a.UserID = at.UserID 
    where at.LessonID = :lessonID and a.Role = 'student'`,
    {
      replacements: { lessonID },
      type: QueryTypes.SELECT,
    }
  );

  // find teachers
  const teacherList = await sequelize.query(
    `
    select a.UserID, a.FullName
    from Accounts a 
    join Attendance at on a.UserID = at.UserID
    where at.LessonID = :lessonID and a.Role = 'teacher'`,
    {
      replacements: { lessonID },
      type: QueryTypes.SELECT,
    }
  );
  let lessonObj = lesson.toJSON();

  lessonObj.studentList = studentList;
  lessonObj.teacherList = teacherList;
  console.log(`Successfully fetched details for lesson with ID ${lessonID}.`);
  return lessonObj;
};

export { Lesson, Session };
