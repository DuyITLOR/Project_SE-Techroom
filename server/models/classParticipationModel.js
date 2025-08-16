
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

Participation.addClassParticipation = async function (classID, userIDs) {
    return Promise.all(
        userIDs.map(userID => {
            return Participation.create({
                ClassID: classID,
                UserName: userID
            })
        })
    )
}

export default Participation

