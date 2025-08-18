import Class from "../models/classModel.js";
import Participation from "../models/classParticipationModel.js";

// getClass: get all class information, sort it in the order of most recent first, and pass it onto the View Components.
// This function will call Class.getAllClasses() in Class Model for Administrators to get all listClasses
// and call Class.getRelatedClass() in Class Model for Students/Teachers to get listClasses that they participate in.
export const getClass = async (req, res) => {
    const {userid, role} = req.query;
    if (!userid || !role) {
        return res.status(400).send({
        success: false,
        message: "Username and role cannot be empty!"
        });
    }

    let listClasses;
    if (role === 'admin' || role === 'superadmin') {
        listClasses = await Class.getAllClass();
        return res.status(200).send({
            success: true,
            listClasses: listClasses
        })
    }
    
    listClasses = await Class.getRelatedClasses(userid);
    if (!listClasses.success) {
        return res.status(404).send({
            success: listClasses.success,
            message: listClasses.message
        });
    }

  return res.status(200).send({
    success: listClasses.success,
    message: "Classes retrieved successfully",
    listClasses: listClasses.result,
  });
};

export const addUser = async (req, res) => {
  const { classID, userIDs } = req.body;
  if (!classID) {
    return res.status(400).send({
      success: false,
      message: "ClassID cannot be empty!",
    });
  }

  if (!Array.isArray(userIDs) || userIDs.length === 0) {
    return res
      .status(400)
      .json({ message: "userIDs phải là mảng và không rỗng" });
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
      message: "Tất cả học sinh đã tồn tại trong lớp",
    });
  }

  await Participation.addClassParticipation(classID, newUsers);

  return res.status(200).send({
    success: true,
    message: "New users added!",
  });
};
export const showClassInfomation = async (req, res) => {
  const { classID } = req.body;
  if (!classID) {
    return res.status(400).send({
      success: false,
      message: "ClassID cannot be empty!",
    });
  }

  const classInfo = await Class.showClassInfo(classID);
  if (!classInfo) {
    return res.status(404).send({
      success: false,
      message: "Class not found",
    });
  }

  return res.status(200).send({
    success: true,
    classInfo,
  });
};

export default {
  getClass,
  addUser,
};
