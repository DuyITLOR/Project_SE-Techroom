import sequelize from '../config/db.js';

import Accounts from './accountModel.js';
import Rooms from './roomModel.js';
import Class from './classModel.js';
import Courses from './courseModel.js';
import Participation from './classParticipationModel.js';
import { Lesson, Session } from './lessonModel.js';
import { Attendance } from './attendanceModel.js';
import { Tag, Feedback } from './feedbackModel.js';
import Post from './postModel.js';

// // === Khai báo các quan hệ ===
// Class <--> Courses
Class.belongsTo(Courses, {
  foreignKey: 'CourseID',
  as: 'Course',
});
Courses.hasMany(Class, {
  foreignKey: 'CourseID',
  as: 'Classes',
});

// Class <--> Participation <--> Accounts
Class.belongsToMany(Accounts, {
  through: Participation,
  foreignKey: 'ClassID',
  otherKey: 'Username',
  as: 'participatedUsers',
});
Accounts.belongsToMany(Class, {
  through: Participation,
  foreignKey: 'Username',
  otherKey: 'ClassID',
  as: 'participatedClasses',
});

// Session <--> Lesson
Lesson.belongsTo(Session, {
  foreignKey: 'SessionNumber',
  as: 'Session',
});
Session.hasMany(Lesson, {
  foreignKey: 'SessionNumber',
  as: 'Lessons',
});

// Class <--> Lesson
Lesson.belongsTo(Class, {
  foreignKey: 'ClassID',
  as: 'Class',
});
Class.hasMany(Lesson, {
  foreignKey: 'ClassID',
  as: 'Lessons',
});

// Room <--> Lesson
Lesson.belongsTo(Rooms, {
  foreignKey: 'RoomID',
  as: 'Room',
});
Rooms.hasMany(Lesson, {
  foreignKey: 'RoomID',
  as: 'Lessons',
});

// Account <--> Attendance <--> Lesson
Accounts.belongsToMany(Lesson, {
  through: Attendance,
  foreignKey: 'UserID',
  otherKey: 'LessonID',
  as: 'UserAttendances',
});
Lesson.belongsToMany(Accounts, {
  through: Attendance,
  foreignKey: 'LessonID',
  otherKey: 'UserID',
  as: 'UsersAttending',
  onDelete: 'CASCADE',
});

// Feedback <--> Tag
Feedback.belongsTo(Tag, {
  foreignKey: 'TagID',
  as: 'Tag',
});
Tag.hasMany(Feedback, {
  foreignKey: 'TagID',
  as: 'Feedbacks',
});

// Feedback <--> Account (Students)
Feedback.belongsTo(Accounts, {
  foreignKey: 'StudentID',
  as: 'Student',
});
Accounts.hasMany(Feedback, {
  foreignKey: 'StudentID',
  as: 'StudentGotFeedbacked',
});

// Feedback <--> Account (Teachers)
Feedback.belongsTo(Accounts, {
  foreignKey: 'TeacherID',
  as: 'Teacher',
});
Accounts.hasMany(Feedback, {
  foreignKey: 'TeacherID',
  as: 'TeacherGaveFeedback',
});

// Feedback <--> Class
Feedback.belongsTo(Class, {
  foreignKey: 'ClassID',
  as: 'Class',
});
Class.hasMany(Feedback, {
  foreignKey: 'ClassID',
  as: 'Feedbacks',
});

// Post <--> Class
Post.belongsTo(Class, {
  foreignKey: 'ClassID',
  as: 'Class',
});
Class.hasMany(Post, {
  foreignKey: 'ClassID',
  as: 'PostsOfClass',
});

// Post <--> Account
Post.belongsTo(Accounts, {
  foreignKey: 'UserID',
  as: 'UserOfPost',
});
Accounts.hasMany(Post, {
  foreignKey: 'UserID',
  as: 'PostsByUser',
});

// Export tất cả models
const db = {
  sequelize,
  Accounts,
  Rooms,
  Class,
  Participation,
  Courses,
  Lesson,
  Session,
  Attendance,
  Feedback,
  Tag,
  Post,
};
export default db;
