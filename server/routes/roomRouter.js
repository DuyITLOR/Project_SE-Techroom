
import express from "express";
import { getRooms, searchRoom, addRoom, updateRoom, deleteRoom } from "../controllers/admin/admin_roomController.js";

const roomRouter = express.Router();

roomRouter.get('/room', getRooms)
roomRouter.get('/room/search', searchRoom)
roomRouter.post('/room', addRoom)
roomRouter.put('/room', updateRoom)
roomRouter.delete('/room', deleteRoom)

export default roomRouter
