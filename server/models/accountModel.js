
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Account = sequelize.define('Account', {
    username: {
        type: DataTypes.STRING,
        allowNULL: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNULL: true
    },
    role: {
        type: DataTypes.STRING,
        allowNULL: false
    }
  },  {
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})

Account.findByUsername = async function (username) {
    return await this.findOne({ where: { username } });
};

export default Account;
