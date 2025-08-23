import db from './index.js';

const { Lesson, Session, Rooms, Class, Accounts } = db;

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

Lesson.addLesson = async function (classID, date, sessionNumber, roomID) {
  try {
    const parentClass = await Class.findByPk(classID);
    if (!parentClass) {
      throw new Error(`Class with ID ${classID} does not exist.`);
    }

    const parentRoom = await Rooms.findByPk(roomID);
    if (!parentRoom) {
      throw new Error(`Room with ID ${roomID} does not exist.`);
    }

    const parentSession = await Session.findByPk(sessionNumber);
    if (!parentSession) {
      throw new Error(`Session with number ${sessionNumber} does not exist.`);
    }

    const newLesson = await Lesson.create({
      ClassID: classID,
      Date: date,
      SessionNumber: sessionNumber,
      RoomID: roomID,
    });

    const userInClass = await parentClass.getParticipatedUsers();

    console.log(userInClass);

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
  const transaction = await db.sequelize.transaction();
  try {
    console.log(`Updating lesson with ID: ${lessonID}`);
    console.log(`Updated Info:`, updatedInfo);
    const lesson = await Lesson.findByPk(lessonID, { transaction });
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonID} does not exist.`);
    }

    // update a lesson's main data.
    if (updatedInfo.lessonData) {
      await lesson.update(updatedInfo.lessonData, { transaction });
      console.log(`Lesson with ID ${lessonID} updated successfully.`);
    }

    if (updatedInfo.studentIDs || updatedInfo.teacherIDs) {
      const allUserIDs = [...(updatedInfo.studentIDs || []), ...(updatedInfo.teacherIDs || [])];
      const users = await Accounts.findAll({
        where: { UserID: allUserIDs },
        transaction,
      });
      await lesson.setUsersAttending(users, { transaction });
      console.log(`Student and and teacher list updated for lesson with ID ${lessonID}.`);
    }

    await transaction.commit();

    const updatedLesson = await Lesson.getLessonDetails(lessonID);
    console.log(`Lesson with ID ${lessonID} updated successfully.`);
    return updatedLesson;
  } catch (error) {
    console.error(`Error updating lesson ${lessonID}:`, error);
    await transaction.rollback();
    throw error;
  }
};

export { Lesson };
