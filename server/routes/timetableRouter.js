import express from 'express';
import { handleByPrefix } from '../middlewares/prefixHandler.js';
import {
  getAllLessonsForTimetable,
  getLessonByID,
  addLesson,
  deleteLesson,
  updateLesson,
  getClassNotInTimetable,
  addMultipleLessons,
} from '../controllers/admin/admin_TimetableController.js';
import { getRelatedLessonsForTimetable } from '../controllers/timetableController.js';

const timetableRouter = express.Router();

timetableRouter.use(handleByPrefix);

timetableRouter.get('/timetable', (req, res, next) => {
  const handler = req.isAdmin ? getAllLessonsForTimetable : getRelatedLessonsForTimetable;
  handler(req, res, next);
});

timetableRouter.get('/timetable/lessonInfo', (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).send({
      success: false,
      message: 'You do not have permission to view lesson details.',
    });
  } else {
    const handler = getLessonByID;
    handler(req, res, next);
  }
});

timetableRouter.get('/timetable/classNotInTimetable', (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).send({
      success: false,
      message: 'You do not have permission to view class details.',
    });
  } else {
    const handler = getClassNotInTimetable;
    handler(req, res, next);
  }
})

timetableRouter.post('/timetable/add-lesson', (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).send({
      success: false,
      message: 'You do not have permission to add lessons.',
    });
  } else {
    const handler = addLesson;
    handler(req, res, next);
  }
});

timetableRouter.post('/timetable/add-multiple-lessons', (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).send({
      success: false,
      message: 'You do not have permission to add multiple lessons.',
    });
  } else {
    const handler = addMultipleLessons;
    handler(req, res, next);
  }
});

timetableRouter.delete('/timetable/delete-lesson', (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).send({
      success: false,
      message: 'You do not have permission to delete lessons.',
    });
  } else {
    const handler = deleteLesson;
    handler(req, res, next);
  }
});

timetableRouter.put('/timetable/update-lesson', (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).send({
      success: false,
      message: 'You do not have permission to update lessons.',
    });
  } else {
    const handler = updateLesson;
    handler(req, res, next);
  }
});

export default timetableRouter;
