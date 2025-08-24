import { Tag, Feedback } from "../../models/feedbackModel.js";

//getAllTask()
export const getAllTask = async (req, res) => {
  const { teacherID } = req.query;
  const tags = await Tag.getAllTag();
  if (!tags) {
    return res.status(400).send({
      success: false,
      message: "Cannot find any tag!",
    });
  }
  return res.status(200).send({
    success: true,
    listTag: tags,
  });
};

//giveFeedback()
export const giveFeedback = async (req, res) => {
  const { classID, teacherID, studentID, text, tagID } = req.body;
  if (!classID || !studentID || !teacherID || !tagID) {
    return res.status(400).send({
      success: false,
      message: "Fields cannot be empty!",
    });
  }
  const newFeedback = await Feedback.addFeedback(
    classID,
    teacherID,
    studentID,
    tagID,
    text
  );
  if (!newFeedback) {
    return res.status(400).send({
      success: false,
      message: "Cannot give feedback!",
    });
  }
  return res.status(200).send({
    success: true,
    message: "Feedback given successfully!",
    newFeedback: newFeedback,
  });
};

//deleteFeedback()
export const deleteTeacherFeedback = async (req, res) => {
  const { feedbackID } = req.query;
  if (!feedbackID) {
    return res.status(400).send({
      success: false,
      message: "FeedbackID cannot be empty!",
    });
  }
  const result = await Feedback.deleteFeedback(feedbackID);
  if (result === 0) {
    return res.status(400).send({
      success: false,
      message: "Cannot delete feedback!",
    });
  }
  return res.status(200).send({
    success: true,
    message: "Feedback deleted successfully!",
  });
};

//updateFeedback()
export const updateTeacherFeedback = async (req, res) => {
  const { feedbackID, content, tagID } = req.query;
  if (!feedbackID) {
    return res.status(400).send({
      success: false,
      message: "FeedbackID cannot be empty!",
    });
  }
  const updatedFeedback = await Feedback.updateFeedback(
    feedbackID,
    content,
    tagID
  );
  if (!updatedFeedback) {
    return res.status(400).send({
      success: false,
      message: "Cannot update feedback!",
    });
  }
  return res.status(200).send({
    success: true,
    message: "Feedback updated successfully!",
    updatedFeedback: updatedFeedback,
  });
};
