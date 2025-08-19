import express from 'express';
import { handleByPrefix } from '../middlewares/prefixHandler.js';
import { getAllLessonsForTimetable, getLessonByID } from '../controllers/admin/admin_TimetableController.js';
import { getRelatedLessonsForTimetable } from '../controllers/timetableController.js';

const timetableRouter = express.Router();

timetableRouter.use(handleByPrefix);

timetableRouter.get('/timetable', (req, res, next) => {
  const handler = req.isAdmin ? getAllLessonsForTimetable : getRelatedLessonsForTimetable;
  handler(req, res, next);
});

timetableRouter.get('/timetable/:lessonID', (req, res, next) => {
  const handler = getLessonByID;
  handler(req, res, next);
});

export default timetableRouter;
