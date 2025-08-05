
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Account = sequelize.define('Account', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },  {
    tableName: 'Accounts', // Tên bảng trong cơ sở dữ liệu
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})

Account.findByUsername = async function (username) {
    return await this.findOne({ where: { username } });
};

export default Account;
