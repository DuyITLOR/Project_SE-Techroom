
import express from "express";
import { addAccount, getAccount,searchAccount, updateAccount, deleteAccount } from "../controllers/admin/admin_accountController.js";

const adminRouter = express.Router();

adminRouter.get('/account', getAccount)
adminRouter.get('/account/search', searchAccount)
adminRouter.post('/account', addAccount)
adminRouter.put('/account', updateAccount)
adminRouter.delete('/account', deleteAccount)

export default adminRouter
