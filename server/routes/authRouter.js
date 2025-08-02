
import express from "express";
import { login, authenticate } from "../controllers/accountController.js";

const authRouter = express.Router();

authRouter.post('/auth', login)
authRouter.post('/auth/authenticate', authenticate)

export default authRouter
