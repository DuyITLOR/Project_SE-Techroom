
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Session = sequelize.define('Session', {
	SessionNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	StartTime: {
		type: DataTypes.TIME,
		allowNull: false
	},
	EndTime: {
		type: DataTypes.TIME,
		allowNull: false
	}
},  {
	tableName: 'Session',
	timestamps: false
})

const Lesson = sequelize.define('Lesson', {
	ClassID: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: false
	},
	Date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		primaryKey: true,
	},
	SessionNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	RoomID: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	}
},  {
		tableName: 'Lesson',
		timestamps: false
})

export {Lesson, Session};

