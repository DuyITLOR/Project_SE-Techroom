import db from './index.js';
import { Op, QueryTypes } from 'sequelize';

const { sequelize, Lesson, Session, Rooms, Class, Accounts } = db;

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
    attributes: [
      'LessonID',
      'ClassID',
      'Date',
      'SessionNumber',
      'RoomID',
      [sequelize.col('Room.RoomName'), 'RoomName'],
    ],
    include: {
      model: Rooms,
      as: 'Room',
      attributes: [],
    },
    raw: true,
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
    select ls.*, r.RoomName
    from Lesson ls
    join Attendance at on ls.LessonID = at.LessonID
    join Rooms r on ls.RoomID = r.RoomID
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

  console.log(`Successfully fetched lessons related to user ${userID} for the week.`);
  return lessons;
};

Lesson.getLessonDetails = async function (lessonID) {
  const lesson = await Lesson.findByPk(lessonID, {
    attributes: [
      'LessonID',
      'ClassID',
      'Date',
      'SessionNumber',
      'RoomID',
      [sequelize.col('Room.RoomName'), 'RoomName'],
    ],
    include: {
      model: Rooms,
      as: 'Room',
      attributes: [],
    } 
  });

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

Lesson.addLesson = async function (classID, date, sessionNumber, roomID, transaction) {
  try {
    const parentClass = await Class.findByPk(classID, { transaction });
    if (!parentClass) {
      throw new Error(`Class with ID ${classID} does not exist.`);
    }

    const parentRoom = await Rooms.findByPk(roomID, { transaction });
    if (!parentRoom) {
      throw new Error(`Room with ID ${roomID} does not exist.`);
    }

    const parentSession = await Session.findByPk(sessionNumber, { transaction });
    if (!parentSession) {
      throw new Error(`Session with number ${sessionNumber} does not exist.`);
    }

    const newLesson = await Lesson.create(
      {
        ClassID: classID,
        Date: date,
        SessionNumber: sessionNumber,
        RoomID: roomID,
      },
      { transaction }
    );

    const userInClass = await parentClass.getParticipatedUsers({ transaction });

    await newLesson.setUsersAttending(userInClass, { transaction });

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
  const transaction = await db.sequelize.transaction();
  try {
    console.log(`Updating lesson with ID: ${lessonID}`);
    console.log(`Updated Info:`, updatedInfo);

    const lesson = await Lesson.findByPk(lessonID, {
      include: [
        {
          model: Accounts,
          as: 'UsersAttending',
          attributes: ['UserID'],
          through: {
            attributes: [],
          }
        }
      ],
      transaction 
    });
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonID} does not exist.`);
    }

    let isUpdated = false;
    // update a lesson's main data. get number of affected rows for checking if there is any change
    if (updatedInfo.lessonData) {
      const [affectedRows] = await Lesson.update(updatedInfo.lessonData, { 
        where: { LessonID: lessonID },
        transaction 
      });
      
      if (affectedRows > 0) {
        isUpdated = true;
      }
      console.log(`Lesson with ID ${lessonID} updated successfully.`);
    }
    
    if (updatedInfo.studentIDs || updatedInfo.teacherIDs) {
      // check if there are any updates.
      const allNewUserIDs = [...(updatedInfo.studentIDs || []), ...(updatedInfo.teacherIDs || [])].sort();
      const allCurrentUserIDs = lesson.UsersAttending.map(user => user.UserID).sort();

      // if yes then update
      if (JSON.stringify(allNewUserIDs) !== JSON.stringify(allCurrentUserIDs)) {
        const users = await Accounts.findAll({
          where: { UserID: allNewUserIDs },
          transaction,
        });

        await lesson.setUsersAttending(users, { transaction });
        isUpdated = true;
        console.log(`Student and and teacher list updated for lesson with ID ${lessonID}.`);
      }
    }

    await transaction.commit();

    const updatedLesson = await Lesson.getLessonDetails(lessonID);
    console.log(`Lesson with ID ${lessonID} updated successfully.`);
    return { updatedLesson, isUpdated };
  } catch (error) {
    console.error(`Error updating lesson ${lessonID}:`, error);
    await transaction.rollback();
    throw error;
  }
};

export { sequelize, Lesson };
