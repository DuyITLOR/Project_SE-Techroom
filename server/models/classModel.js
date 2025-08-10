
import { DataTypes } from "sequelize";
import { Op } from 'sequelize';
import sequelize from "../config/db.js";

const Class = sequelize.define('Class', {
    // ClassID: primary key which is used to distinguish classes.
    ClassID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    // ClassName: the class’ name.
    ClassName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // LessonsPerWeek: how many lessons does the class take place in one week.
    LessonsPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // ClassNumWeek: how many weeks does the class take place.
    ClassNumWeek: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // BeginDate: it’s shown when the class starts and takes its first lesson.
    BeginDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    // EndDate: it’s shown when the class takes its last lesson and ends.
    EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    // CourseID: foreign key references to Courses, show the study program that the class is teaching.
    CourseID: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Courses', // Tên bảng tham chiếu
            key: 'CourseID'   // Khóa chính của bảng tham chiếu
        }
    }
  },  {
    tableName: 'Class', // Tên bảng trong cơ sở dữ liệu
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})
//addClass(): Create a new class and then add it into the database
Class.addClass = async function (classID, className, lessonsPerWeek, classNumWeek,beginDate, endDate, courseID) {
    return await this.create({
        ClassID: classID,
        ClassName: className, 
        LessonsPerWeek: lessonsPerWeek,
        ClassNumWeek: classNumWeek,
        BeginDate: beginDate,
        EndDate: endDate,
        CourseID: courseID,
    })
}
// getAllClass(): Get all classs in the database
Class.getAllClass = async function () {
    return await this.findAll()
}
//getRelatedClasses(): Get all classes related to the username from the data Class Participation table
Class.getRelatedClasses = async function (userID) {
    return await this.findAll({
        include: [{
            model: sequelize.models.Participation,
            attributes:[], //Chặn không lấy thuộc tính nào từ Participation
            where: { Username: userID }
        }],
        order: [['EndDate', 'DESC']] // Sắp xếp theo ngày bắt đầu
    });
}
//updateClass(): Change one class’s information
Class.updateClass = async function (ClassID, className, lessonsPerWeek, classNumWeek,beginDate, endDate, courseID) {
    const upclass = await this.findByPk(ClassID)
    if (!upclass) {
        return null
    }
    upclass.ClassName= className
    upclass.LessonsPerWeek= lessonsPerWeek
    upclass.ClassNumWeek= classNumWeek
    upclass.BeginDate= beginDate
    upclass.EndDate= endDate
    upclass.CourseID= courseID
    await upclass.save()
    return upclass
}
//deleteClass(): Delete an existing class from the database
Class.deleteClass = async function (ClassID) {
    const declass = await this.findByPk(ClassID)
    if (!declass) {
        return false
    }
    await declass.destroy()
    return true
}
//getClassStudentList which student is in ClassParticipate table
Class.getClassStudentList = async function (ClassID) {
    return await sequelize.models.Participation.findAll({
        where: { ClassID: ClassID,Role: 'student' }, // Chỉ lấy những người có vai trò là Student
        attributes: ['Username'] // Chỉ lấy thuộc tính ID của học sinh
    });
}
//getClassTeacherList which teacher is in ClassParticipate table
Class.getClassTeacherList = async function (ClassID) {
    return await sequelize.models.Participation.findAll({
        where: { ClassID: ClassID, Role: 'teacher' }, // Chỉ lấy những người có vai trò là Teacher
        attributes: ['Username'] // Chỉ lấy thuộc tính ID của giáo viên
    });
}
//viewClassDiscussion(): get all feedback from Feedback table that have the same ClassID and Tag from Tag table that is reference by the feedback
Class.viewClassDiscussion = async function (ClassID) {
    return await sequelize.models.Feedback.findAll({
        where: { ClassID: ClassID },
        include: [{
            model: sequelize.models.Tag
        }]
    });
}
//sendClassTimetable(): get info from all the lesson that have the same ClassID in Lesson table
Class.sendClassTimetable = async function (ClassID) {
    return await sequelize.models.Lesson.findAll({
        where: { ClassID: ClassID },
        order: [['Date', 'ASC']] // Sắp xếp theo ngày
    });
}
//searchClass(): Search for classs by ClassID
Class.searchClass = async function (classID) {
    return await this.findAll({ 
        where: { 
            ClassID: {[Op.like]: `%${classID}%`},
        } 
    });
}

export default Class;
