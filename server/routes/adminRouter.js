
import express from "express";
import { addStudentAccount, getStudentAccount } from "../controllers/admin/admin_studentController.js";

const adminRouter = express.Router();

adminRouter.get('/student', getStudentAccount)
adminRouter.post('/student', addStudentAccount)

export default adminRouter
