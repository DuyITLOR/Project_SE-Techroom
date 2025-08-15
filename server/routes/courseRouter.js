
import express from "express";
import upload from "../middlewares/uploads.js";
import { getCourses, searchCourse, addCourse, updateCourse, deleteCourse, downloadSyllabus, uploadSyllabus } from "../controllers/admin/admin_courseController.js";

const courseRouter = express.Router();

courseRouter.get('/course', getCourses)
courseRouter.get('/course/search', searchCourse)
courseRouter.get('/course/download', downloadSyllabus)
courseRouter.post('/course', addCourse)
courseRouter.post('/course/upload', upload.single('syllabus'), uploadSyllabus);
courseRouter.put('/course', updateCourse)
courseRouter.delete('/course', deleteCourse)

export default courseRouter
