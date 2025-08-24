import Class from "../../models/classModel.js";
import Participation from "../../models/classParticipationModel.js";

export const getClassByRole = async (req, res) => {
  const { classID, role } = req.query;
  const classes = await Class.getClassByRole(classID, role);

  if (!classes.success) {
    return res.status(200).send({
      success: classes.success,
      message: classes.message,
    });
  }
  return res.status(200).send({
    success: classes.success,
    message: "Classes retrieved successfully",
    classes: classes.result,
  });
};

export const addClass = async (req, res) => {
  try {
    const {
      classID,
      className,
      lessonsPerWeek,
      classNumWeek,
      beginDate,
      endDate,
      courseID,
      studentIDs,
      teacherIDs
    } = req.body;

    const userIDs = studentIDs.concat(teacherIDs);

    const requiredFields = { 
      classID,
      className,
      lessonsPerWeek,
      classNumWeek,
      beginDate,
      endDate,
      courseID,
      studentIDs,
      teacherIDs
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === 'N/A' || !value || value.length === 0) {
        return res.send({
          success: false,
          msg: `${key} cannot be empty!`
        });
      }
    }

    const existingClass = await Class.findByPk(classID);
    if (existingClass) {
      return res.send({
        success: false,
        msg: "Class already exists",
      });
    }

    const newClass = await Class.addClass(
      classID,
      className,
      lessonsPerWeek,
      classNumWeek,
      beginDate,
      endDate,
      courseID
    );

    if (!Array.isArray(userIDs) || userIDs.length === 0) {
      return res.send({ 
        success: false,
        msg: "userIDs should be an array or not null" 
      });
    }

    // 1. Lấy danh sách user đã có trong lớp
    const existing = await Participation.findAll({
      where: { ClassID: classID },
      attributes: ["UserName"],
    });

    const existingUserIds = existing.map((e) => e.UserName);

    // 2. Lọc những user chưa có
    const newUsers = userIDs.filter(
      (userId) => !existingUserIds.includes(userId)
    );

    if (newUsers.length === 0) {
      return res.status(200).json({
        success: false,
        msg: "Every users are already in class",
      });
    }

    await Participation.addClassParticipation(newClass.ClassID, newUsers);

    return res.status(200).send({
      success: true,
      message: "New class added!",
      newClass: newClass,
    });
  } catch (error) {
      res.json({
        success: false,
        msg: error.message
      });
  }
};

export const searchClass = async (req, res) => {
  const { classID } = req.query;
  if (!classID) {
    return res.status(400).send({
      success: false,
      message: "ClassID cannot be empty!",
    });
  }

  const classes = await Class.searchClass(classID);
  if (!classes.success) {
    return res.send({
      success: false,
      message: "Cannot find any class!",
    });
  }
  return res.status(200).send({
    Class: classes.result,
  });
};

export const updateClass = async (req, res) => {
  try {
    const {
      ClassID,
      className,
      lessonsPerWeek,
      classNumWeek,
      beginDate,
      endDate,
      courseID,
      studentIDs,
      teacherIDs
    } = req.body;

    const requiredFields = { 
      ClassID,
      className,
      lessonsPerWeek,
      classNumWeek,
      beginDate,
      endDate,
      courseID,
      studentIDs,
      teacherIDs
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === 'N/A' || !value || value.length === 0) {
        return res.send({
          success: false,
          msg: `${key} cannot be empty!`
        });
      }
    }

    const updatedClass = await Class.updateClass(
      ClassID,
      className,
      lessonsPerWeek,
      classNumWeek,
      beginDate,
      endDate,
      courseID
    );

    if (!updatedClass) {
      return res.send({
        success: false,
        msg: "Class not found"
      });
    }

    const userIDs = studentIDs.concat(teacherIDs);
    if (!Array.isArray(userIDs) || userIDs.length === 0) {
      return res.send({ 
        success: false,
        msg: "userIDs should be an array or not null" 
      });
    }

    // 1. Lấy danh sách user đã có trong lớp
    const existing = await Participation.findAll({
      where: { ClassID: ClassID },
      attributes: ["UserName"],
    });

    const existingUserIds = existing.map((e) => e.UserName);

    // 2. Lọc những user chưa có
    const newUsers = userIDs.filter(
      (userId) => !existingUserIds.includes(userId)
    );

    if (newUsers.length === 0) {
      return res.status(200).json({
        success: false,
        msg: "Every users are already in class",
      });
    }

    await Participation.destroy({
      where: { ClassID: ClassID },
    });

    await Participation.addClassParticipation(ClassID, newUsers);

    return res.status(201).json({
      message: "Class updated successfully!",
      updatedClass: updatedClass,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error.message
    });
  }
};

export const deleteClass = async (req, res) => {
  const { classID } = req.body;
  console.log("classID: ", classID);
  const deletedClass = await Class.deleteClass(classID);
  if (!deletedClass.success) {
    return res.status(404).send({
      message: deletedClass.message,
    });
  }

  return res.status(201).send({
    message: deletedClass.message,
  });
};

export default {
  getClassByRole,
  addClass,
  searchClass,
  updateClass,
  deleteClass,
};
