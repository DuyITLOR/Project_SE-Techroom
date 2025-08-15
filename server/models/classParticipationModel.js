
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
    Username: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true
    }
  },  {
    tableName: 'Participation', // Tên bảng trong cơ sở dữ liệu
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})

Participation.addClassParticipation = async function (classid, userID) {
    return await this.create({
        ClassID: classid,
        UserName: userID,
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

export { Participation };

