// import sequelize from '../config/db.js';
// import Accounts from './accountModel.js';
// import Rooms from './roomModel.js';
// import Class from './classModel.js';
// //import Participation from './participationModel.js';
// import Courses from './courseModel.js';
// //import Lesson from './lessonModel.js';
// //import Feedback from './feedbackModel.js';
// //import Tag from './Tag.js';

// // === Khai báo các quan hệ ===

// // Class <-> ClassParticipation
// Class.hasMany(ClassParticipation, { foreignKey: 'ClassID' });
// ClassParticipation.belongsTo(Class, { foreignKey: 'ClassID' });

// //Accounts<-> ClassParticipation
// Accounts.hasMany(ClassParticipation, { foreignKey: 'Username' });
// ClassParticipation.belongsTo(Accounts, { foreignKey: 'Username' });

// // Course <-> Class
// Course.hasMany(Class, { foreignKey: 'CourseID' });
// Class.belongsTo(Course, { foreignKey: 'CourseID' });

// // Class <-> Lesson
// //Class.hasMany(Lesson, { foreignKey: 'ClassID' });
// //Lesson.belongsTo(Class, { foreignKey: 'ClassID' });

// // Feedback <-> Tag
// //Feedback.belongsTo(Tag, { foreignKey: 'TagID' });
// //Tag.hasMany(Feedback, { foreignKey: 'TagID' });

// // Class <-> Feedback
// //Class.hasMany(Feedback, { foreignKey: 'ClassID' });
// //Feedback.belongsTo(Class, { foreignKey: 'ClassID' });

// // Export tất cả models
// export {
//     sequelize,
//     Class,
//     Participation,
//     Courses,
//     Accounts,
//     Rooms
// };
