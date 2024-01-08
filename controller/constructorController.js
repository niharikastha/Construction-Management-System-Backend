const constructorService = require('../services/constructorService');
const userValidation = require('../library/userValidation');


const getAllData = (req, res) => {

    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");

        const validated = userValidation.checkEmail(reqEmail, res);

        if (validated) {
            constructorService.getAllConstruction(userId, res);

        }



    } catch (err) {
        console.log(err, "error");
    }
}



const addConstructorController = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");

        

        const data= {
            constructor: userId,
            constructionName: req.body.constructionName,
            assignment: req.body.assignment,
            price: req.body.price,
            description: req.body.description,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            // bluePrint: imageUrl
        }
        console.log(data,"data")
       
            constructorService.addConstructor(userId, data, res);

    } catch (err) {
        console.log(err);
    }
}


// update project
const updateConstructor = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");


        const constructorId = req.params.constructorId;
        let constructor = {
            // projectId: req.body.projectId,
            constructionName: req.body.constructionName,
            assignment: req.body.assignment,
            price: req.body.price,
            description: req.body.description,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
        }
       
            constructorService.updateConstructor(userId, constructorId, constructor, res);


    } catch (err) {
        console.log(err);

    }

}

//delete project by id
const deleteConstructor = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "//");
        const reqEmail = user_details.email;
        console.log(reqEmail, "eeee");
        const userId = user_details._id;
        console.log(userId, "id...");


        const constructorId = req.params.constructorId;
        console.log(constructorId,"...............................")

        
            constructorService.deleteConstructor(userId, constructorId, res);



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



const userController = {
    getAllData,
    addConstructorController,
    updateConstructor,
    deleteConstructor
}
module.exports = userController;



