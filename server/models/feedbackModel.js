import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import Class from './classModel.js';
import Accounts from './accountModel.js';
import Participation from './classParticipationModel.js';

const Tag = sequelize.define(
  'Tag',
  {
    TagID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: false,
    },
    TagModel: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    tableName: 'Tag',
    timestamps: false,
  }
);

const Feedback = sequelize.define(
  'Feedback',
  {
    FeedbackID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ClassID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: false,
    },
    StudentID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: false,
    },
    TeacherID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: false,
    },
    Text: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      primaryKey: false,
    },
    TagID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    }
  },
  {
    tableName: 'Feedback',
    timestamps: false,
  }
);





Feedback.addFeedback = async function (classID, teacherID, studentID, tagID, text) {
  try {
    const parentClass = await Class.findByPk(classID);
    if (!parentClass) {
      throw new Error(`Class with ID ${classID} does not exist.`);
    }

    const parentTeacher = await Accounts.findByPk(teacherID);
    if (!parentTeacher) {
      throw new Error(`User with ID ${teacherID} does not exist.`);
    }
    else if (parentTeacher.Role != 'teacher'){ 
      throw new Error(`Teacher with ID ${teacherID} does not exist.`);
    }

    const parentStudent = await Accounts.findByPk(studentID);
    if (!parentStudent) {
      throw new Error(`User with ID ${studentID} does not exist.`);
    }
    else if (parentStudent.Role != 'student'){ 
      throw new Error(`Student with ID ${studentID} does not exist.`);
    }
    const partTeacher = await Participation.findOne({
        where: { ClassID: classID, Username: teacherID }
    });
    if (!partTeacher) {
        throw new Error(`Teacher with ID ${teacherID} is not part of class ${classID}.`);
    }
    const partStudent = await Participation.findOne({
        where: { ClassID: classID, Username: studentID }
    });
    if (!partStudent) { 
        throw new Error(`Student with ID ${studentID} is not part of class ${classID}.`);
    } 

    const parentTag = await Tag.findByPk(tagID);
    if (!parentTag) {
      throw new Error(`Tag with ID ${tagID} does not exist.`);
    }
    //if the created feedback already exists, return error
    const existingFeedback = await Feedback.findOne({
        where: {
            ClassID: classID,
            StudentID: studentID,
            TeacherID: teacherID,
            TagID: tagID,
        },
        logging: console.log
      }).catch(err => {
        throw new Error("SQL error Quoc");
      });
    if (existingFeedback) {
        throw new Error('Feedback already exists.');
    }

    const newFeedback = await Feedback.create({
      ClassID: classID,
      StudentID: studentID,
      TeacherID: teacherID, 
      Text: text,
      TagID: tagID
    });
    return newFeedback;
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

//getStudentFeedbacks(): get all feedbacks of a student
Feedback.getStudentFeedbacks = async function (studentID) {
  try {
    const parentStudent = await Accounts.findByPk(studentID);
    if (!parentStudent) {
      throw new Error(`User with ID ${studentID} does not exist.`);
    }
    else if (parentStudent.Role != 'student'){ 
      throw new Error(`Student with ID ${studentID} does not exist.`);
    }
    const Feedbacks=await Feedback.findAll({
        where: {StudentID:studentID },
        order: [["FeedbackID", "DESC"]]
    })
    return Feedbacks;
  }catch (error) {
    console.error('Error view student feedback:', error);
    throw error;
  }
  
};

//updateFeedback()
Feedback.updateFeedback = async function (feedbackID,content,tagID) {
    try {
        const feedback = await Feedback.findByPk(feedbackID);
        if (!feedback) {
        throw new Error(`Feedback with ID ${feedbackID} does not exist.`);
        }
        if (tagID) {
        const parentTag = await Tag.findByPk(tagID);
        if (!parentTag) {
            throw new Error(`Tag with ID ${tagID} does not exist.`);
        }
        feedback.TagID = tagID;
        }
        if (content) {
        feedback.Text = content;
        }
        await feedback.save();
        return feedback;
    } catch (error) {
        console.error(`Error updating feedback with ID ${feedbackID}:`, error);
        throw error;
    }
}

Feedback.deleteFeedback = async function (feedbackID) {
    try {
        const feedback = await Feedback.findByPk(feedbackID);
        if (!feedback) {
        return 0;
        }
        await feedback.destroy();
        return 1;
    } catch (error) {
        return 0;
    }
}

//getAllTag()
Tag.getAllTag = async function () {
  try {
    const tags = await Tag.findAll();
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
}
Feedback.viewOne = async function (feedbackID) {
    try {
        const feedback = await Feedback.findByPk(feedbackID);
        if (!feedback) {
        throw new Error(`Feedback with ID ${feedbackID} does not exist.`);
        }
        return feedback;
    } catch (error) {
        console.error(`Error viewing feedback with ID ${feedbackID}:`, error);
        throw error;
    } 
}


export { Feedback, Tag };
