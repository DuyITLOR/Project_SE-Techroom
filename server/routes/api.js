
import express from "express";
import authRouter from "./authRouter.js"
import adminRouter from "./adminRouter.js"
import roomRouter from "./roomRouter.js";

const APIRoute = express.Router();

APIRoute.use('/', authRouter)
APIRoute.use('/admin', adminRouter)
APIRoute.use('/admin', roomRouter)

export default APIRoute;
