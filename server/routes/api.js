
import express from "express";
import authRouter from "./authRouter.js"
import adminRouter from "./adminRouter.js"

const APIRoute = express.Router();

APIRoute.use('/', authRouter)
APIRoute.use('/admin', adminRouter)

export default APIRoute;
