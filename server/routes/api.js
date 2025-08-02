
import express from "express";
import authRouter from "./authRouter.js"

const APIRoute = express.Router();

APIRoute.use('/', authRouter);

export default APIRoute;
