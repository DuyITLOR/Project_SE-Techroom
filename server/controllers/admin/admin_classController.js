
import Class from '../../models/classModel.js'
import Participation from '../../models/classParticipationModel.js'

export const getClassByRole = async (req, res) => {
    const { classID, role } = req.body
    console.log("req.body:", req.body)
    const classes = await Class.getClassByRole(classID, role)

    if (!classes.success) {
        return res.status(200).send({
            success: classes.success,
            message: classes.message
        })
    }
    return res.status(200).send({
        success: classes.success,
        message: "Classes retrieved successfully",
        classes: classes.result
    })
}

export const addClass = async (req, res) => {
    const { classID, className, lessonsPerWeek, classNumWeek, beginDate, endDate, courseID, userIDs } = req.body
    if(!classID) {
        return res.status(400).send({
          success: false, 
          message: "ClassID cannot be empty!"
        })
    }
    const existingClass = await Class.findByPk(classID);
    if (existingClass) {
        return res.send({
            msg: "Class already exists"
        });
    }

    const newClass = await Class.addClass(classID, className, lessonsPerWeek, classNumWeek, beginDate, endDate, courseID)

    if (!Array.isArray(userIDs) || userIDs.length === 0) {
        return res.status(400).json({ message: "userIDs phải là mảng và không rỗng" });
    }

        // 1. Lấy danh sách user đã có trong lớp
        const existing = await Participation.findAll({
            where: { ClassID: classID },
            attributes: ["UserName"]
        });
        
        const existingUserIds = existing.map(e => e.UserName);
    
        // 2. Lọc những user chưa có
        const newUsers = userIDs.filter(
            (userId) => !existingUserIds.includes(userId)
        );
    
        if (newUsers.length === 0) {
            return res.status(200).json({
                success: false,
                message: "Tất cả học sinh đã tồn tại trong lớp"
            });
        }

    await Participation.addClassParticipation(newClass.ClassID, newUsers);

    return res.status(200).send({
        success: true, 
        message: 'New class added!',
        newClass: newClass
    })
}

export const searchClass = async (req, res) => {
    const { classID } = req.body
    if(!classID) {
        return res.status(400).send({
        success: false, 
        message: "ClassID cannot be empty!"
        })
    }

    const classes = await Class.searchClass(classID)
    if(!classes) {
        return res.send({
        success: false,
        message: "Cannot find any class!"
        })
    }
    return res.status(200).send({
        Class: classes
    })
}

export const updateClass = async (req, res)=> {
    const { ClassID, className, lessonsPerWeek, classNumWeek, beginDate, endDate, courseID } = req.body
    const updatedClass = await Class.updateClass(ClassID, className, lessonsPerWeek, classNumWeek, beginDate, endDate, courseID)
    if(!updatedClass) {
        return res.status(404).send({
            message: "Class not found"
        })
    }
    return res.status(201).json({
        message: "Class updated successfully!",
        updatedClass: updatedClass
    })
}

export const deleteClass = async (req, res)=> {
    const { classID } = req.body
    console.log("classID: ", classID)
    const deletedClass = await Class.deleteClass(classID)
    if(!deletedClass) {
        return res.status(404).send({
            message: "Class not found"
        })
    }
    return res.status(201).send({
        message: "Class is deleted"
    })
}


export default {
    getClassByRole,
    addClass,
    searchClass,
    updateClass,
    deleteClass
}
