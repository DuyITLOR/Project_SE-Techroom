import db from './index.js';

const { Lesson, Session, Rooms, Class, Accounts } = db;

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
