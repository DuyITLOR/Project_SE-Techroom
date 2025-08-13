import express from "express";
import {getClass} from "../controllers/classController.js";

const classRouter = express.Router();

classRouter.get('/getclass', getClass);

export default classRouter;