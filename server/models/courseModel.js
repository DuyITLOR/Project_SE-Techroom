
import { DataTypes } from "sequelize";
import { Op } from 'sequelize';
import fs  from 'fs';
import path from "path";
import sequelize from "../config/db.js";
import { Sequelize } from "sequelize";

const Courses = sequelize.define('Courses', {
    //CourseID: The ID of the course
    CourseID: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true
    },
    //CourseName: Name of the course
    CourseName: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    //CourseNumber: The order of the course in the roadmap. Initially, no course is in the roadmap, so the value is null. 
    // After adding to the roadmap (see addToRoadmap()), this becomes an int denoting the order of the course, with 1 as the start.
    CourseNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    //Syllabus: Link to the course syllabus
    Syllabus: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    //Equipment: Name of the equipments
    Equipment: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
  },  {
    tableName: 'Courses', // Tên bảng trong cơ sở dữ liệu
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})
//addCourse(): Create a new course and then add it into the database
Courses.addCourse = async function (courseID, courseName, courseNumber, syllabus, equipment) {
    return await this.create({
        CourseID: courseID,
        CourseName: courseName, 
        CourseNumber: courseNumber,
        Syllabus: syllabus,
        Equipment: equipment
    })
}

//deleteCourse(): Delete an existing course from the database
Courses.deleteCourse = async function (CourseID) {
    try {
        const course = await this.findByPk(CourseID);
        if (!course) {
            return { 
                success: false, 
                message: "Course not found!" 
            };
        }
        await course.destroy();
        return { 
            success: true,
            message: "Course deleted successfully!" 
        };
    } catch (error) {
        if (error instanceof Sequelize.ForeignKeyConstraintError) {
            // Truy vấn tìm các bảng đang tham chiếu tới CourseID
            const [results] = await this.sequelize.query(`
                SELECT TABLE_NAME AS referencing_table, COLUMN_NAME AS referencing_column
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE REFERENCED_TABLE_NAME = 'Courses'
                AND REFERENCED_COLUMN_NAME = 'CourseID'
                AND TABLE_SCHEMA = DATABASE();
            `);

            const tables = results.map(r => `${r.referencing_table}.${r.referencing_column}`);
            return {
                success: false,
                message: `Cannot delete CourseID = ${CourseID} because it is referenced in: ${tables.join(", ")}`
            };
        }
    }
}

//updateCourse(): Change one course’s information
Courses.updateCourse = async function (CourseID, courseName, courseNumber, syllabus, equipment) {
    const course = await this.findByPk(CourseID)
    if (!course) {
        return null
    }
    course.CourseName = courseName
    course.CourseNumber = courseNumber
    course.Syllabus = syllabus
    course.Equipment = equipment
    await course.save()
    return course
}
//searchCourse(): Search for courses by CourseID
Courses.searchCourse = async function (courseID) {
    return await this.findAll({ 
        where: { 
            CourseID: {[Op.like]: `%${courseID}%`},
        } 
    });
}
// getAllCourse(): Get all courses in the database
Courses.getAllCourses = async function () {
    return await this.findAll({
        order: [['CourseNumber', 'ASC']]
    })
}

Courses.downloadSyllabus = async function (syllabus) {
    const filePath = path.join(process.cwd(), 'public', syllabus)
    console.log(filePath)

    if (fs.existsSync(filePath)) {
        return { exists: true, filePath };
    }
    return { exists: false, message: 'File not found' };
}

Courses.uploadSyllabus = async function (CourseID, file) {
    const course = await this.findByPk(CourseID)
    if (!course) {
        return null
    }
    course.Syllabus = file.filename
    await course.save()
    return true
}

// addToRoadmap(): Set the value CourseNumber to a desired integer denoting the order of the course into the roadmap, 
// and find any course that has the same roadmap number and move it up by one. For example, with a roadmap having 4 courses, 
// adding a roadmap with number 3 moves the old number 3 course to number 4, number 4 to number 5, and so on.
// deleteFromRoadmap(): Set the CourseNumber value for the specified course to null, thus removing it from the roadmap. Additionally, 
// move every course with numbers higher than the removed course up by 1.

export default Courses;
