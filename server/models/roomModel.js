import { DataTypes, QueryTypes } from "sequelize";
import { Op } from 'sequelize';
import sequelize from "../config/db.js";

const Rooms = sequelize.define('Rooms', {
    //RoomID: ID of the room, which distinguishes one room from another
    RoomID: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true
    },
    //RoomName: Name of the room
    RoomName: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    //Note: Any related note for the room (eg. Lights break, …)
    Note: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
  },  {
    tableName: 'Rooms', // Tên bảng trong cơ sở dữ liệu
    timestamps: false   // KHÔNG dùng createdAt/updatedAt
})
//addRoom(): Create a new room object and add it into the database.
Rooms.addRoom = async function (roomID, roomName, note) {
    return await this.create({
        RoomID: roomID,
        RoomName: roomName,
        Note: note
    })
}
//getAllRooms(): Return a list of all rooms with their information.
Rooms.getAllRooms = async function () {
    return await this.findAll();
}
//deleteRoom(): Delete an existing room from the database.
Rooms.deleteRoom = async function (RoomID) {
    const room = await this.findByPk(RoomID)
    if (!room) {
        return false
    }
    await room.destroy()
    return true
}
//updateRoom(): Change one or multiple information attributes of the room.
Rooms.updateRoom = async function (RoomID, roomName, note) {
    const room = await this.findByPk(RoomID)
    if (!room) {
        return null
    }
    room.RoomName = roomName
    room.Note = note
    await room.save()
    return room
}

//searchRoom(): Search for a room by its name, used for searching rooms in the database.
Rooms.searchRoom = async function (roomID) { 
    return await this.findAll({ 
        where: { 
            RoomID: {[Op.like]: `%${roomID}%`}
        } 
    });
}

Rooms.findAvailableRooms = async function (date, sessionNumber) {
    const results = await sequelize.query(
        `select r.RoomID, r.RoomName
        from Rooms r
        where r.RoomID not in (
        select ls.RoomID
        from Lesson ls
        where ls.Date = :date and ls.SessionNumber = :sessionNumber
        )`,
        {
            replacements: { date, sessionNumber },
            type: QueryTypes.SELECT,
        }
    );
    return results;
}

export default Rooms;
