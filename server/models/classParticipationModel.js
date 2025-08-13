
import { DataTypes } from "sequelize";
import { Op } from 'sequelize';
import sequelize from "../config/db.js";

const Participation = sequelize.define('Participation', {
    //ID của class
    ClassID: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true
    },
    //ID của người dùng
    UserName: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true
    },
    Role: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
  },  {
    tableName: 'Participation', // Tên bảng trong cơ sở dữ liệu
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})

Participation.addClassParticipation = async function (classid, userID, role) {
    return await this.create({
        ClassID: classid,
        UserName: userID,
        Role: role
    })
}


Participation.getAllClassParticipation = async function (classid) {
    return await this.findAll({
        where: {
            ClassID: classid
        }
    })
}

Participation.getAllClass = async function (userid) {
    return await this.findAll({
        where: {
            UserName: userid
        }
    })
}

