
import Accounts from '../../models/accountModel.js'

export const getStudentAccount = async (req, res) => {
    const {role} = req.body
    const listUsers = await Accounts.getAllAccount(role)

    return res.status(200).send({
        success: true, 
        message: "Correct username",
        listUsers: listUsers
    })
}

export const addStudentAccount = async (req, res) => {
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

export default {
    getStudentAccount,
    addStudentAccount
}

