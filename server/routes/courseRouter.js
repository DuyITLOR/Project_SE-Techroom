
import express from "express";
import { getCourses, searchCourse, addCourse, updateCourse, deleteCourse } from "../controllers/admin/admin_courseController.js";

const courseRouter = express.Router();

courseRouter.get('/course', getCourses)
courseRouter.get('/course/search', searchCourse)
courseRouter.post('/course', addCourse)
courseRouter.put('/course', updateCourse)
courseRouter.delete('/course', deleteCourse)

export default courseRouter
