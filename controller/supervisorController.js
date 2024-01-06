const supervisorService = require('../services/supervisorService');
const userValidation = require('../library/userValidation');


const getAllSupervisor = (req, res) => {

    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");

        const validated = userValidation.checkEmail(reqEmail, res);

        if (validated) {
            supervisorService.getAll_Supervisor(userId, res);

        }
    } catch (err) {
        console.log(err, "error");
    }
}



// create a project
const addSupervisor = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");



        const supervisor = {

            supervisorId: userId,
            name: req.body.name,
            assignment: req.body.assignment,
            description: req.body.description,
            task: req.body.task,
            // blueprint: req.body.blueprint
        }
        console.log(supervisor, "data")

        supervisorService.add_Supervisor(userId, supervisor, res);

    } catch (err) {
        console.log(err);
    }
}
// update project
const updateSupervisor = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");


        const ID = req.params.Id;
        const supervisor = {
            supervisorId: userId,
            name: req.body.name,
            assignment: req.body.assignment,
            description: req.body.description,
            task: req.body.task,
            // blueprint: req.body.blueprint
        }

        supervisorService.update_Supervisor(userId, ID, supervisor, res);

    } catch (err) {
        console.log(err);

    }

}
//delete project by id
const deleteSupervisor = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");


        const ID = req.params.Id;
        console.log(ID, "...............................")

        supervisorService.delete_Supervisor(userId, ID, res);


    } catch (err) {
        console.log(err);
    }

}

const supervisorController = {
    addSupervisor,
    getAllSupervisor,
    updateSupervisor,
    deleteSupervisor
}
module.exports = supervisorController