import Class from '../models/classModel.js';

// getClass: get all class information, sort it in the order of most recent first, and pass it onto the View Components. 
// This function will call Class.getAllClasses() in Class Model for Administrators to get all listClasses
// and call Class.getRelatedClass() in Class Model for Students/Teachers to get listClasses that they participate in. 
export const getClass = async (req, res) => {
    const {userid, role} = req.body;
    if (!userid || !role) {
        return res.status(400).send({
        success: false,
        message: "Username and role cannot be empty!"
        });
    }
    if (role !== 'admin' && role !== 'teacher' && role !== 'student' && role !== 'superadmin') {
        return res.status(400).send({
        success: false,
        message: "Invalid role!"
        });
    }
    let listClasses;
    if (role === 'admin' || role === 'superadmin') {
        listClasses = await Class.getAllClass();
    } else {
        listClasses = await Class.getRelatedClasses(userid);
    }

    if (!listClasses) {
        return res.status(200).send({
        success: true,
        message: "No class found."
        });
    }

    return res.status(200).send({
        success: true,
        message: "Classes retrieved successfully",
        listClasses: listClasses
    });
}

export default {
    getClass
}
