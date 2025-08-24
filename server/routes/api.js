
import express from "express";
import authRouter from "./authRouter.js"
import adminRouter from "./adminRouter.js"
import roomRouter from "./roomRouter.js";
import courseRouter from "./courseRouter.js";
import classRouter from "./classRouter.js";
import discussionRouter from "./discussionRouter.js";
import timetableRouter from "./timetableRouter.js";
import feedbackRouter from "./feedbackRouter.js";

const APIRoute = express.Router();

APIRoute.use('/', authRouter)
APIRoute.use('/admin', adminRouter)
APIRoute.use('/admin', roomRouter)
APIRoute.use('/admin', courseRouter)
APIRoute.use('/core', classRouter)
APIRoute.use('/admin', classRouter)
APIRoute.use('/admin',discussionRouter)

APIRoute.use('/core', timetableRouter)
APIRoute.use('/admin', timetableRouter);
APIRoute.use('/core', feedbackRouter);

export default APIRoute;
