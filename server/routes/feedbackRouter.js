import express from "express";
import {
    getAllTask,
    giveFeedback,
    deleteTeacherFeedback,
    updateTeacherFeedback,
} from "../controllers/teacher/teacher_feedbackController.js";
import {
    viewFeedback,
    viewOneFeedback,
} from "../controllers/student/student_feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/feedback/tag", getAllTask,);
feedbackRouter.post("/feedback", giveFeedback);
feedbackRouter.delete("/feedback", deleteTeacherFeedback);
feedbackRouter.put("/feedback", updateTeacherFeedback);
feedbackRouter.get("/feedback",  viewFeedback);
feedbackRouter.get("/feedback/one",  viewOneFeedback);

export default feedbackRouter;
