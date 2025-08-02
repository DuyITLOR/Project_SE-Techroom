import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//   } else {
//     console.log('Connected with database');
//   }
// });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});


export default sequelize;
