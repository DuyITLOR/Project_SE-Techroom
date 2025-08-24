import { DataTypes, QueryTypes } from "sequelize";
import sequelize from "../config/db.js";
import { Sequelize } from "sequelize";

const Class = sequelize.define(
  "Class",
  {
    // ClassID: primary key which is used to distinguish classes.
    ClassID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
    },
    // ClassName: the class’ name.
    ClassName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // LessonsPerWeek: how many lessons does the class take place in one week.
    LessonsPerWeek: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // ClassNumWeek: how many weeks does the class take place.
    ClassNumWeek: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // BeginDate: it’s shown when the class starts and takes its first lesson.
    BeginDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    // EndDate: it’s shown when the class takes its last lesson and ends.
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    // CourseID: foreign key references to Courses, show the study program that the class is teaching.
    CourseID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: "Courses", // Tên bảng tham chiếu
        key: "CourseID", // Khóa chính của bảng tham chiếu
      },
    },
  },
  {
    tableName: "Class", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // KHÔNG dùng createdAt/updatedAt
  }
);

// Hook kiểm tra lần cuối trước khi lưu
Class.beforeSave((instance, options) => {
  if (instance.EndDate && instance.BeginDate && instance.EndDate < instance.BeginDate) {
    throw new Error("EndDate must be after or equal to BeginDate");
  }
});

//addClass(): Create a new class and then add it into the database
Class.addClass = async function (
  classID,
  className,
  lessonsPerWeek,
  classNumWeek,
  beginDate,
  endDate,
  courseID
) {
  return await this.create({
    ClassID: classID,
    ClassName: className,
    LessonsPerWeek: lessonsPerWeek,
    ClassNumWeek: classNumWeek,
    BeginDate: beginDate,
    EndDate: endDate,
    CourseID: courseID,
  });
};
// getAllClass(): Get all classs in the database
Class.getAllClass = async function () {
  const results = await sequelize.query(
    `
        SELECT c.FullName, c.Role, cl.*
        FROM Class cl
        JOIN Participation p ON cl.ClassID = p.ClassID
        JOIN Accounts c ON p.Username = c.UserID
        `,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (!results.length) {
    return {
      success: false,
      message: "No classes found for this user",
    };
  }

  const groupedClasses = {};

  results.forEach((item) => {
    if (!groupedClasses[item.ClassID]) {
      groupedClasses[item.ClassID] = {
        ClassID: item.ClassID,
        ClassName: item.ClassName,
        LessonsPerWeek: item.LessonsPerWeek,
        ClassNumWeek: item.ClassNumWeek,
        BeginDate: item.BeginDate,
        EndDate: item.EndDate,
        CourseID: item.CourseID,
        students: [],
        teachers: [],
      };
    }

    if (item.Role === "student") {
      groupedClasses[item.ClassID].students.push({
        FullName: item.FullName,
      });
    } else if (item.Role === "teacher") {
      groupedClasses[item.ClassID].teachers.push({
        FullName: item.FullName,
      });
    }
  });

  const formatted = Object.values(groupedClasses);

  return {
    success: true,
    result: formatted,
  };
};
//getRelatedClasses(): Get all classes related to the username from the data Class Participation table
Class.getRelatedClasses = async function (userID) {
  const results = await sequelize.query(
    `
        SELECT c.FullName, c.Role, cl.*
        FROM Class cl
        JOIN Participation p ON cl.ClassID = p.ClassID
        JOIN Accounts c ON p.Username = c.UserID
        WHERE p.Username = :userID
        `,
    {
      replacements: { userID },
      type: QueryTypes.SELECT,
    }
  );
  if (!results.length) {
    return {
      success: false,
      message: "No classes found for this user",
    };
  }

  const groupedClasses = {};

  results.forEach((item) => {
    if (!groupedClasses[item.ClassID]) {
      groupedClasses[item.ClassID] = {
        ClassID: item.ClassID,
        ClassName: item.ClassName,
        LessonsPerWeek: item.LessonsPerWeek,
        ClassNumWeek: item.ClassNumWeek,
        BeginDate: item.BeginDate,
        EndDate: item.EndDate,
        CourseID: item.CourseID,
        students: [],
        teachers: [],
      };
    }

    if (item.Role === "student") {
      groupedClasses[item.ClassID].students.push({
        FullName: item.FullName,
      });
    } else if (item.Role === "teacher") {
      groupedClasses[item.ClassID].teachers.push({
        FullName: item.FullName,
      });
    }
  });

  const formatted = Object.values(groupedClasses);

  return {
    success: true,
    result: formatted,
  };
};
//updateClass(): Change one class’s information
Class.updateClass = async function (
  ClassID,
  className,
  lessonsPerWeek,
  classNumWeek,
  beginDate,
  endDate,
  courseID
) {
  try {
    const upclass = await this.findByPk(ClassID);
    if (!upclass) {
      return null;
    }
    return await this.update(
      {
        ClassID: ClassID,
        ClassName: className,
        LessonsPerWeek: lessonsPerWeek,
        ClassNumWeek: classNumWeek,
        BeginDate: beginDate,
        EndDate: endDate,
        CourseID: courseID,
      }, {
        where: { ClassID: ClassID }
      }
    );
  } catch (err) {
    console.error("Validation error:", err.errors?.map(e => e.message));
  }
};
//deleteClass(): Delete an existing class from the database
Class.deleteClass = async function (ClassID) {
  try {
    const declass = await this.findByPk(ClassID);
    if (!declass) {
      return false;
    }
    await declass.destroy();
    return {
      success: true,
      message: "Course deleted successfully!",
    };
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      // Truy vấn tìm các bảng đang tham chiếu tới CourseID
      const [results] = await this.sequelize.query(`
                SELECT TABLE_NAME AS referencing_table, COLUMN_NAME AS referencing_column
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE REFERENCED_TABLE_NAME = 'Class'
                AND REFERENCED_COLUMN_NAME = 'ClassID'
                AND TABLE_SCHEMA = DATABASE();
            `);

      const tables = results.map(
        (r) => `${r.referencing_table}.${r.referencing_column}`
      );
      return {
        success: false,
        message: `Cannot delete ClassID = ${ClassID} because it is referenced in: ${tables.join(
          ", "
        )}`,
      };
    }
  }
};
//getClassStudentList which student is in ClassParticipate table
Class.getClassByRole = async function (classID, role) {
  const results = await sequelize.query(
    `
        SELECT a.*
        FROM Class c
        JOIN Participation p ON c.ClassID = p.ClassID
        JOIN Accounts a ON p.Username = a.UserID
        WHERE a.Role = :role AND p.ClassID = :classID
        `,
    {
      replacements: { role, classID },
      type: QueryTypes.SELECT,
    }
  );
  if (!results.length) {
    return {
      success: false,
      message: "No classes found for this user",
    };
  }
  return {
    success: true,
    result: results,
  };
};
//viewClassDiscussion(): get all feedback from Feedback table that have the same ClassID and Tag from Tag table that is reference by the feedback
Class.viewClassDiscussion = async function (ClassID) {
  return await sequelize.models.Feedback.findAll({
    where: { ClassID: ClassID },
    include: [
      {
        model: sequelize.models.Tag,
      },
    ],
  });
};
//sendClassTimetable(): get info from all the lesson that have the same ClassID in Lesson table
Class.sendClassTimetable = async function (ClassID) {
  return await sequelize.models.Lesson.findAll({
    where: { ClassID: ClassID },
    order: [["Date", "ASC"]], // Sắp xếp theo ngày
  });
};
//searchClass(): Search for classs by ClassID
Class.searchClass = async function (classID) {
  const results = await sequelize.query(
    `
        SELECT a.UserID, a.FullName, a.Role, c.*
        FROM Class c
        JOIN Participation p ON c.ClassID = p.ClassID
        JOIN Accounts a ON p.Username = a.UserID
        WHERE p.ClassID LIKE :classID
        `,
    {
      replacements: { classID: `%${classID}%` },
      type: QueryTypes.SELECT,
    }
  );

  if (!results.length) {
    return {
      success: false,
      message: "No classes found for this user",
    };
  }

  const groupedClasses = {};

  results.forEach((item) => {
    if (!groupedClasses[item.ClassID]) {
      groupedClasses[item.ClassID] = {
        ClassID: item.ClassID,
        ClassName: item.ClassName,
        LessonsPerWeek: item.LessonsPerWeek,
        ClassNumWeek: item.ClassNumWeek,
        BeginDate: item.BeginDate,
        EndDate: item.EndDate,
        CourseID: item.CourseID,
        students: [],
        teachers: [],
      };
    }

    if (item.Role === "student") {
      groupedClasses[item.ClassID].students.push({
        UserID: item.UserID,
        FullName: item.FullName,
      });
    } else if (item.Role === "teacher") {
      groupedClasses[item.ClassID].teachers.push({
        UserID: item.UserID,
        FullName: item.FullName,
      });
    }
  });

  const formatted = Object.values(groupedClasses);

  return {
    success: true,
    result: formatted,
  };
};

Class.showClassInfo = async function (classID) {
  const upclass = await this.findByPk(classID);
  if (!upclass) {
    return null;
  }
  return upclass;
};

export default Class;
