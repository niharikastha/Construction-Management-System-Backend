
const userService = require('../services/userService');
const userValidation = require('../library/userValidation');


const getAllProject = (req, res) => {

    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");

        // const projectManagerId = req.params.projectManagerId;

        const validated = userValidation.checkEmail(reqEmail, res);

        if (validated) {
            userService.getAllProject(userId, res);//projectManagerId

        }

    } catch (err) {
        console.log(err, "error");
    }
}



// create a project
const addProject = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");
        console.log(req.file);

        const imageUrl = `http://localhost:4000/uploads/${req.file.originalname}`

        console.log(imageUrl, "image");
        const data = {
            projectManagerId: userId,
            projectName: req.body.projectName,
            projectPic: imageUrl,
            location: req.body.location,
            price: req.body.price,
            description: req.body.description
        }
        const validated = userValidation.projectValidation(data, res);
        console.log(validated, "  validated")


        if (validated) {
            userService.addProject(userId, data, res);
            console.log("project added");
        }

    } catch (err) {
        console.log(err);
    }

}
// update project
const updateProject = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");

        const projectId = req.params.projectId
        let project = req.body
        console.log(project);
        userService.updateProject(userId, projectId, project, res);



    } catch (err) {
        console.log(err);

    }

}
//delete project by id
const deleteProject = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");


        const projectId = req.params.projectId;


        const validated = userValidation.deleteProjectValidation(projectId, res);
        console.log(validated, "  validated");
        if (validated) {
            userService.deleteProject(userId, projectId, res);

        }


    } catch (err) {
        console.log(err);
    }

}
// image upload
const uploadFile = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");

        const projectId = req.params.projectId;
        console.log(projectId, 'projectManagerId');

        const uploadData = {};

        if (req.file.path) {
            uploadData["user_file"] = req.file.path
        }

        userService.getFileUpload(reqEmail, projectId, uploadData, res);
    } catch (err) {
        console.log(err, "error");
    }
}
const downloadProject = async (req, res) => {
    try {
        const user_details = req.userDetails;
        const userId = user_details._id;
        const projectId = req.params.projectId;
        // console.log(projectId, "projectID")

        userService.downloadProject(userId, projectId, res);
    } catch (err) {
        console.log(err, "error");
        responseHandler(res, 500, "Server error occurred", null, true);
    }
};


const userController = {
    getAllProject,
    addProject,
    updateProject,
    deleteProject,
    uploadFile,
    downloadProject
}
module.exports = userController;
