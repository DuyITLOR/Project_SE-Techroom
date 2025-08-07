
import Accounts from '../../models/accountModel.js'

export const getAccount = async (req, res) => {
    const {role} = req.query
    const listUsers = await Accounts.getAllAccount(role)

    return res.status(200).send({
        success: true, 
        message: "Correct username",
        listUsers: listUsers
    })
}

export const addAccount = async (req, res) => {
    const { userID, fullName, birthday, password, role } = req.body
    if(!userID) {
        return res.status(400).send({
          success: false, 
          message: "UserID cannot be empty!"
        })
    }
    const existingAccount = await Accounts.findByPk(userID);
    if (existingAccount) {
        return res.send({
            msg: "UserID already exists"
        });
    }

    const newUser = await Accounts.addAccount(userID, fullName, birthday, password, role)
    let msg = ''
    if(role === 'student') {
        msg = 'New student added'
    }
    if(role === 'admin') { 
        msg = 'New admin added'
    }
    if(role === 'teacher') {
        msg = 'New teacher added'
    }
    return res.status(200).send({
        success: true, 
        message: msg,
        newUser
    })
};

export const updateAccount = async (req, res)=> {
    const { userID, fullName, birthday, password, role } = req.body
    const user = await Accounts.updateAccount(userID, fullName, birthday, password, role)
    if(!user) {
        return res.status(404).send({
            message: "User not found!"
        })
    }
    return res.status(201).json({
        message: "User updated successfully!",
        updatedUser: user
    })
}

export const deleteAccount = async (req, res)=> {
    const { userID } = req.body
    const user = await Accounts.deleteAccount(userID)
    if(user === 0) {
        return res.status(404).send({
            message: "User not found!"
        })
    }
    if(user === 1) {
        return res.send({
            message: "This account cannot be deleted"
        })
    }
    return res.status(201).json({
        message: "User deleted successfully!",
    })
}

export default {
    getAccount,
    addAccount,
    updateAccount,
    deleteAccount
}

