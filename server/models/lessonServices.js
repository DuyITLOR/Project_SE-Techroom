import db from "./index.js";


const { Lesson, Session, Rooms, Class, Accounts } = db;

Lesson.addLesson = async function (classID, date, sessionNumber, roomID) {
  try {
    const parentClass = await Class.findByPk(classID);
    if (!parentClass) {
      throw new Error(`Class with ID ${classID} does not exist.`);
    }
    
    const parentRoom = await Rooms.findByPk(roomID);
    if(!parentRoom) {
      throw new Error(`Room with ID ${roomID} does not exist.`);
    }

    const parentSession = await Session.findByPk(sessionNumber);
    if(!parentSession) {
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

export { Lesson };