
import { DataTypes } from "sequelize";
import { Op } from 'sequelize';
import sequelize from "../config/db.js";

const Accounts = sequelize.define('Accounts', {
    UserID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Birthday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },  {
    tableName: 'Accounts', // Tên bảng trong cơ sở dữ liệu
    timestamps: false         // KHÔNG dùng createdAt/updatedAt
})

Accounts.getInfoAccount = async function (username) {
    return await this.findOne({ 
        where: { 
            UserID: username 
        } 
    });
};

Accounts.searchAccount = async function (userID, role) {
    return await this.findOne({ 
        where: { 
            userID: {[Op.like]: `%${userID}%`},
            Role: role
        } 
    });
}

Accounts.getAllAccount = async function (role) {
    return await this.findAll({
        where: {
            Role: role
        }
    })
}

Accounts.addAccount = async function (userID, fullName, birthday, password, role) {retrer
    return await this.create({
        UserID: userID,
        FullName: fullName, 
        Birthday: birthday,
        Password: password,
        Role: role
    })
}

Accounts.updateAccount = async function (UserID, fullName, birthday, password, role) {
    const user = await this.findByPk(UserID)
    if (!user) {
        return null
    }
    user.FullName = fullName
    user.Birthday = birthday
    user.Password = password
    user.Role = role
    await user.save()
    return user
}

Accounts.deleteAccount = async function (UserID) {
    const user = await this.findByPk(UserID)
    if (!user) {
        return 0
    }
    if (user.Role === "superadmin") {
        return 1
    }
    await user.destroy()
    return 2
}

export default Accounts;
