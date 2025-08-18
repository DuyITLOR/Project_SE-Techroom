import express from 'express';
import { handleByPrefix } from '../middlewares/prefixHandler.js';
import { json } from 'sequelize';

const timetableRouter = express.Router();

timetableRouter.use(handleByPrefix);

timetableRouter.get('/timetable', (req, res, next) => {
  const handler = req.isAdmin ? getAllLessonsForWeek : getRelatedLessonsForWeek;
  handler(req, res, next);
});

export default timetableRouter;
