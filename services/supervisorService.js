const Supervisor = require('../models/Supervisor');
const User = require('../models/User');
const authModels = require('../models/authModels');
const responseHandler = require('../responseHandler/response_handler');


//
const getAll_Supervisor = async (userId, res) => {
    console.log(userId, "userId");
    try {
        const userDetails = await authModels.getUserById(userId, res);
        const allSupervisor = await Supervisor.find({ supervisorId: userId });
        console.log(allSupervisor, ".........");
        responseHandler(res, 200, "Fetch  All Completed Supervisor", allSupervisor, false);

    } catch (err) {
        console.log(err, "err");
        responseHandler(res, 500, "server error occurred ", null, true);
    }

}
//
const add_Supervisor = async (userId, supervisor, res) => {

    try {
        const userDetails = await authModels.getUserById(userId, res);

        const existUser = await User.find({ _id: userId });
        console.log(existUser, "....")


        if (existUser) {
            const findUser = existUser[0].role;
            console.log(findUser, "findUser");

            if (findUser == "supervisor") {
                const newSupervisor = new Supervisor({
                    supervisorId: supervisor.supervisorId,
                    name: supervisor.name,
                    assignment: supervisor.assignment,
                    description: supervisor.description,
                    task: supervisor.task,
                    // blueprint: req.body.blueprint
                })
                await newSupervisor.save();
                console.log(newSupervisor, "newSupervisor");
                responseHandler(res, 200, "Supervisor Task created successfully", newSupervisor, false);

            }
            else {
                return responseHandler(res, 401, "Your role is not matched.So, You can't create a new Task", null, true);
            }
        }
        else {
            return responseHandler(res, 400, "User not found", null, true);
        }
    } catch (err) {
        console.log(err);
        responseHandler(res, 500, "server error occurred");
    }

}
//
const update_Supervisor = async (userId, ID, supervisor, res) => {
    try {
        const userDetails = await authModels.getUserById(userId, res);
        const updatedSupervisor = await Supervisor.findByIdAndUpdate({ _id: ID }, supervisor);
        console.log(updatedSupervisor, 'updated Supervisor');
        responseHandler(res, 200, " Supervisor Task updated successfully", updatedSupervisor, false);

    } catch (err) {
        console.log(err, "error");
        responseHandler(res, 500, "Server error", null, true);
    }

}
//
const delete_Supervisor = async (userId, ID, res) => {
    try {
        let deleteId = false;
        const userDetails = await authModels.getUserById(userId, res);
        const existSupervisorTask = await Supervisor.findById({ _id: ID });
        if (!existSupervisorTask) {
            return responseHandler(res, 401, "Invalid supervisor Task id.Task is not exist.", null, true);
        }
        deleteId = await Supervisor.deleteOne({ _id: ID, supervisorId: userId });
        responseHandler(res, 200, "Project was deleted successfully", deleteId, false);



    } catch (err) {
        console.log(err, "error");
        responseHandler(res, 500, "Server error", null, true);
    }
}


const supervisorService = {
    getAll_Supervisor,
    add_Supervisor,
    delete_Supervisor,
    update_Supervisor
}
module.exports = supervisorService;