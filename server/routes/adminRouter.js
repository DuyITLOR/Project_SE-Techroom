
import express from "express";
import { addAccount, getAccount, updateAccountInfo } from "../controllers/admin/admin_accountController.js";

const adminRouter = express.Router();

adminRouter.get('/account', getAccount)
adminRouter.post('/account', addAccount)
adminRouter.put('/account', updateAccountInfo)

export default adminRouter
