import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Rooms = sequelize.define('Rooms', {
    RoomID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    RoomName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Note: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },  {
    tableName: 'Rooms', // Tên bảng trong cơ sở dữ liệu
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})


export default Rooms;
