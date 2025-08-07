
import express from "express";
import { addAccount, getAccount, updateAccount, deleteAccount } from "../controllers/admin/admin_accountController.js";

const adminRouter = express.Router();

adminRouter.get('/account', getAccount)
adminRouter.post('/account', addAccount)
adminRouter.put('/account', updateAccount)
adminRouter.delete('/account', deleteAccount)

export default adminRouter
