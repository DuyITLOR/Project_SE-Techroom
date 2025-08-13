
import express from "express";
import authRouter from "./authRouter.js"
import adminRouter from "./adminRouter.js"
import roomRouter from "./roomRouter.js";
import courseRouter from "./courseRouter.js";
import classRouter from "./classRouter.js";

const APIRoute = express.Router();

APIRoute.use('/', authRouter)
APIRoute.use('/admin', adminRouter)
APIRoute.use('/admin', roomRouter)
APIRoute.use('/admin', courseRouter)
APIRoute.use('/core', classRouter)

export default APIRoute;
