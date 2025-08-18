import express from "express";
import { addUser, getClass,showClassInfomation } from "../controllers/classController.js";
import { getClassByRole, addClass, searchClass, updateClass, deleteClass } from "../controllers/admin/admin_classController.js";
import { handleByPrefix } from "../middlewares/prefixHandler.js";

const classRouter = express.Router();

classRouter.use(handleByPrefix);

classRouter.get('/class', (req, res, next) => {
    const handler = req.isAdmin ? getClassByRole : getClass
    handler(req, res, next)
});

classRouter.post('/class', (req, res, next) => {
    const handler = req.isAdmin ? addClass : addUser
    handler(req, res, next)
})

classRouter.get('/class/search', (req, res, next) => {
    const handler = searchClass
    handler(req, res, next)
})

classRouter.put('/class', (req, res, next) => {
    const handler = updateClass
    handler(req, res, next)
})

classRouter.delete('/class', (req, res, next) => {
    const handler = deleteClass
    handler(req, res, next)
})
classRouter.get('/class/info', (req, res, next) => {
    const handler = showClassInfomation
    handler(req, res, next)
})

export default classRouter;