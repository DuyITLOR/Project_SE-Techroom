
import Rooms from '../../models/roomModel.js'

export const getRooms = async (req, res) => {
    const {} = req.query
    const listRooms = await Rooms.getAllRooms()

    return res.status(200).send({
        success: true,
        listUsers: listRooms
    })
}

export const searchRoom = async (req, res) => {
    const { roomID } = req.query;
    if(!roomID) {
        return res.status(400).send({
        success: false, 
        message: "roomID cannot be empty!"
        })
    }

    const room = await Rooms.searchRoom(roomID)
    if(room === null) {
        return res.send({
        success: false,
        message: "Cannot find any room!"
        })
    }
    return res.status(200).send({
        Room: room
    })
}

export const addRoom = async (req, res) => {
    const { roomID, roomName, note } = req.body
    if(!roomID) {
        return res.status(400).send({
          success: false, 
          message: "RoomID cannot be empty!"
        })
    }
    const existingRoom = await Rooms.findByPk(roomID);
    if (existingRoom) {
        return res.send({
            msg: "Room already exists"
        });
    }

    const newRoom = await Rooms.addRoom(roomID, roomName, note)
    return res.status(200).send({
        success: true, 
        message: 'New room added!',
        newRoom: newRoom
    })
};

export const updateRoom = async (req, res)=> {
    const { roomID, roomName, note } = req.body
    const room = await Rooms.updateRoom(roomID, roomName, note)
    if(!room) {
        return res.status(404).send({
            message: "Room not found!"
        })
    }
    return res.status(201).json({
        message: "Room updated successfully!",
        updatedRoom: room
    })
}

export const deleteRoom = async (req, res)=> {
    const { roomID } = req.body
    const room = await Rooms.deleteRoom(roomID)
    if(!room) {
        return res.status(404).send({
            message: "Room not found!"
        })
    }
    return res.status(201).send({
        message: "Room deleted successfully!"
    })
}

export const findAvailableRooms = async (req, res) => {
    try {
        const {date, sessionNumber} = req.query;
        console.log("Finding available rooms for date:", date, "and session number:", sessionNumber);
        let availableRooms = await Rooms.findAvailableRooms(date, sessionNumber);
        console.log('Available Rooms:', availableRooms);
        
        if(!availableRooms || availableRooms.length === 0) {
            availableRooms = [ { empty: true }]
            return res.status(404).send({
                success: false,
                availableRooms: availableRooms,
                message: `No available rooms found for the specified date and session number.`
            });
        }
        return res.status(200).send({
            success: true,
            availableRooms: availableRooms
        });
    } catch (error) {
        console.error('Error finding available rooms:', error);
        return res.status(500).send({
            success: false,
            message: 'An error occurred while finding available rooms.'
        });
    }
}

export default {
    getRooms,
    searchRoom,
    addRoom,
    updateRoom,
    deleteRoom,
    findAvailableRooms
}

