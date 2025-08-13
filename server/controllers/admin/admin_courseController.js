
import Courses from '../../models/courseModel.js'

export const getCourses = async (req, res) => {
    const {} = req.query
    const listCourses = await Courses.getAllCourses()

    return res.status(200).send({
        success: true,
        listUsers: listCourses
    })
}

export const searchCourse = async (req, res) => {
    const { courseID } = req.query;
    if(!courseID) {
        return res.status(400).send({
        success: false, 
        message: "CourseID cannot be empty!"
        })
    }

    const course = await Courses.searchCourse(courseID)
    if(course === null) {
        return res.send({
        success: false,
        message: "Cannot find any course!"
        })
    }
    return res.status(200).send({
        Course: course
    })
}

export const addCourse = async (req, res) => {
    const { courseID, courseName, courseNumber, syllabus, equipment } = req.body
    if(!courseID) {
        return res.status(400).send({
          success: false, 
          message: "CourseID cannot be empty!"
        })
    }
    const existingCourse = await Courses.findByPk(courseID);
    if (existingCourse) {
        return res.send({
            msg: "Course already exists"
        });
    }

    const newCourse = await Courses.addCourse(courseID, courseName, courseNumber, syllabus, equipment)
    return res.status(200).send({
        success: true, 
        message: 'New course added!',
        newCourse: newCourse
    })
};

export const updateCourse = async (req, res)=> {
    const { courseID, courseName, courseNumber, syllabus, equipment } = req.body
    const course = await Courses.updateCourse(courseID, courseName, courseNumber, syllabus, equipment)
    if(!course) {
        return res.status(404).send({
            message: "Course not found!"
        })
    }
    return res.status(201).json({
        message: "Course updated successfully!",
        updatedCourse: course
    })
}

export const deleteCourse = async (req, res)=> {
    const { courseID } = req.body
    console.log("courseID: ", courseID)
    const course = await Courses.deleteCourse(courseID)
    if(!course) {
        return res.status(404).send({
            message: "Course not found!"
        })
    }
    return res.status(201).send({
        message: "Course deleted successfully!"
    })
}

export default {
    getCourses,
    searchCourse,
    addCourse,
    updateCourse,
    deleteCourse
}

