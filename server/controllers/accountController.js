
import Accounts from "../models/accountModel.js";

export const login = async (req, res) => {
  const {username} = req.body;
  if(!username) {
    return res.status(400).send({
      success: false, 
      message: "Username cannot be empty!"
    })
  }

  const user = await Accounts.findByUsername(username)
  if(user === null) {
    return res.send({
      success: false,
      message: "Invalid username!"
    })
  }
  const userData = user.toJSON()
  console.log(userData)

  console.log(userData.username, userData.role)
  return res.status(200).send({
    success: true, 
    message: "Correct username",
    username: userData.username, 
    role: userData.role
  })
}

export const authenticate = async (req, res) => {
  const {username, password} = req.body;
  console.log(req.body)
  if(!username || !password) {
    return res.status(400).send({
      success: false, 
      message: "Password cannot be empty!"
    })
  }

  const user = await Accounts.findByUsername(username)
  const userData = user.toJSON()

  if (userData.password !== password) {
    return res.status(401).send({
      success: false,
      message: "Invalid password."
    });
  }

  console.log(userData.password)
  return res.status(200).send({ 
    success: true,
    message: "Login successful",
  })
}

export default {
  login, authenticate
}
