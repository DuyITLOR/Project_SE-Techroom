import { Feedback} from '../../models/feedbackModel.js';

//viewFeedback()
export const viewFeedback = async (req, res) => {
    const { studentID } = req.body
    if(!studentID) {
        return res.status(400).send({
        success: false,
        message: "StudentID cannot be empty!"
        })
    }
    const Feedbacks = await Feedback.getStudentFeedbacks(studentID)
    if (!Feedbacks) {
        return res.status(400).send({
        success: false,
        message: "Cannot find any feedback!"
        })
    }
    return res.status(200).send({
        success: true, 
        listFeedback: Feedbacks
    })
}

//viewOneFeedback(feedbackID)
export const viewOneFeedback = async (req, res) => {
    const { feedbackID } = req.body
    if(!feedbackID) {
        return res.status(400).send({
        success: false,
        message: "FeedbackID cannot be empty!"
        })
    }
    const feedback = await Feedback.viewOne(feedbackID)
    if (!feedback) {
        return res.status(400).send({
        success: false,
        message: `Cannot find any feedback with ID ${feedbackID}!`
        })
    }
    return res.status(200).send({
        success: true, 
        feedback: feedback
    })
}