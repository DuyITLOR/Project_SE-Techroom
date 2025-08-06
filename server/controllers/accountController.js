
import Accounts from "../models/accountModel.js";

export const login = async (req, res) => {
  const {username} = req.body;
  if(!username) {
    return res.status(400).send({
      success: false, 
      message: "Username cannot be empty!"
    })
  }

  const user = await Accounts.getInfoAccount(username)
  if(user === null) {
    return res.send({
      success: false,
      message: "Invalid username!"
    })
  }
  const userData = user.toJSON()
  console.log(userData)

  return res.status(200).send({
    success: true, 
    message: "Correct username",
    username: userData.UserID, 
    role: userData.Role
  })
}

export const authenticate = async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    return res.status(400).send({
      success: false, 
      message: "Password cannot be empty!"
    })
  }

  const user = await Accounts.getInfoAccount(username)
  const userData = user.toJSON()

  if (userData.Password !== password) {
    return res.status(401).send({
      success: false,
      message: "Invalid password."
    });
  }

  return res.status(200).send({ 
    success: true,
    message: "Login successful",
  })
}

export default {
  login, 
  authenticate
}
