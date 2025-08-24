import { sequelize, Lesson } from '../../models/lessonServices.js';

export const getAllLessonsForTimetable = async (req, res) => {
  const { weekStartDate } = req.query;
  if (!weekStartDate) {
    return res.status(400).send({
      success: false,
      message: 'Week start date cannot be empty!',
    });
  }

  try {
    const listLessons = await Lesson.getAllLessonsForWeek(weekStartDate);
    return res.status(200).send({
      success: true,
      message: 'Lessons retrieved successfully',
      listLessons: listLessons,
    });
  } catch (error) {
    console.error(`Error retrieving lessons for week:`, error);
    return res.status(500).send({
      success: false,
      message: 'Error retrieving lessons for week.',
    });
  }
};

export const getLessonByID = async (req, res) => {
  const { lessonID } = req.query;
  if (!lessonID) {
    return res.status(400).send({
      success: false,
      message: 'Lesson ID cannot be empty!',
    });
  }

  try {
    const lesson = await Lesson.getLessonDetails(lessonID);
    return res.status(200).send({
      success: true,
      message: 'Lesson retrieved successfully',
      lesson: lesson,
    });
  } catch (error) {
    console.error(`Error retrieving lesson by ID:`, error);
    return res.status(500).send({
      success: false,
      message: 'Error retrieving lesson by ID.',
    });
  }
};

export const addLesson = async (req, res) => {
  const { classID, date, sessionNumber, roomID } = req.body;
  if (!classID || !date || !sessionNumber || !roomID) {
    return res.status(400).send({
      success: false,
      message: 'Class ID, date, session number, or room ID cannot be empty!',
    });
  }

  try {
    const newLesson = await Lesson.addLesson(classID, date, sessionNumber, roomID);
    return res.status(201).send({
      success: true,
      message: 'Lesson added successfully',
      lesson: newLesson,
    });
  } catch (error) {
    console.error(`Error adding lesson:`, error);
    return res.status(500).send({
      success: false,
      message: 'Error adding lesson.',
    });
  }
};

export const addMultipleLessons = async (req, res) => {
  const lessons = req.body;
  console.log(`Received lessons:`, lessons.classID);

  if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
    return res.status(400).send({
      success: false,
      message: 'Lessons array cannot be empty!',
    });
  }

  const transaction = await sequelize.transaction(); 
  try {
    for(let i = 0; i < lessons.length; i++) {
      const { classID, date, sessionNumber, roomID } = lessons[i];

      if (!classID || !date || !sessionNumber || !roomID) {
        await transaction.rollback();
        return res.status(400).send({
          success: false,
          message: `Lesson ${i + 1} has missing fields.`,
        });
      }

      await Lesson.addLesson(classID, date, sessionNumber, roomID, transaction);
    }

    await transaction.commit();

    return res.status(201).send({
      success: true,
      message: 'Multiple lessons added successfully',
    });
  } catch (error) {
    await transaction.rollback();
    console.log(`Error adding multiple lessons:`, error);
    await res.status(500).send({
      success: false,
      message: 'Error adding multiple lessons.',
    });
  }
};

export const deleteLesson = async (req, res) => {
  const { lessonID } = req.body;
  if (!lessonID) {
    return res.status(400).send({
      success: false,
      message: 'Lesson ID cannot be empty!',
    });
  }

  try {
    await Lesson.deleteLesson(lessonID);
    return res.status(200).send({
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    console.error(`Error deleting lesson:`, error);
    return res.status(500).send({
      success: false,
      message: 'Error deleting lesson.',
    });
  }
};

export const updateLesson = async (req, res) => {
  const { lessonID, updatedInfo } = req.body;
  if (!lessonID || !updatedInfo) {
    return res.status(400).send({
      success: false,
      message: 'Lesson ID or update information cannot be empty!',
    });
  }

  try {
    const updatedLesson = await Lesson.updateLesson(lessonID, updatedInfo);
    return res.status(200).send({
      success: true,
      message: 'Lesson updated successfully',
      lesson: updatedLesson,
    });
  } catch (error) {
    console.error(`Error updating lesson:`, error);
    return res.status(500).send({
      success: false,
      message: 'Error updating lesson.',
    });
  }
};

export const getClassNotInTimetable = async (req, res) => {
	const {} = req.query
	const classes = await Lesson.getClassNotInTimetable()

	if(!classes.success) {
		return res.send({
			success: classes.success,
			message: classes.message,
		});
	}
	return res.status(200).send({
		success: classes.success,
		results: classes.result
	})
}

