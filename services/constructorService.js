const Constructor = require('../models/Constructor');
const User = require('../models/User');
const authModels = require('../models/authModels');
const responseHandler = require('../responseHandler/response_handler');


//
const getAllConstruction = async (userId, res) => {
    console.log(userId, "userId");
    try {
        const userDetails = await authModels.getUserById(userId, res);
        const constructor = await Constructor.find();
        console.log(constructor, ".........");
        responseHandler(res, 200, "Fetch all constructor", constructor, false);

    } catch (err) {
        console.log(err, "err");
        responseHandler(res, 500, "server error occurred ", null, true);
    }

}
//
const addConstructor = async (userId, data, res) => {
    console.log(data, "dataa");
    try {
        const userDetails = await authModels.getUserById(userId, res);

        const existUser = await User.find({ _id: userId });
        console.log(existUser, "....")


        if (existUser) {
            const findUser = existUser[0].role;
            console.log(findUser, "findUser");

            if (findUser == "contractor") {
                const newConstructor = new Constructor({
                    constructor: data.constructor,
                    constructionName: data.constructionName,
                    assignment: data.assignment,
                    price: data.price,
                    description: data.description,
                    startDate: data.startDate,
                    dueDate: data.dueDate,
                    // bluePrint:data.bluePrint
                })
                await newConstructor.save();
                console.log(newConstructor, "newConstructor");
                responseHandler(res, 200, "Construction created successfully", newConstructor, false);

            }
            else {
                return responseHandler(res, 401, "Your role is not matched.So, You can't create a new construction", null, true);
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
const updateConstructor = async (userId, constructorId, constructor, res) => {
    try {
        const userDetails = await authModels.getUserById(userId, res);
        const updatedConstructor = await Constructor.findByIdAndUpdate({ _id: constructorId }, constructor);
        console.log(updatedConstructor, 'updatedConstructor');
        responseHandler(res, 200, "Project updated successfully", updatedConstructor, false);

    } catch (err) {
        console.log(err, "error");
        responseHandler(res, 500, "Server error", null, true);
    }

}
//
const deleteConstructor = async (userId, id, res) => {
    try {
        let deleteId = false;
        const userDetails = await authModels.getUserById(userId, res);
        const existProject = await Constructor.findById({ _id: id });
        if (!existProject) {
            return responseHandler(res, 401, "Invalid Project id. This project is not exist.", null, true);
        }
        deleteId = await Constructor.deleteOne({ _id: id });
        responseHandler(res, 200, "Project was deleted successfully", deleteId, false);



    } catch (err) {
        console.log(err, "error");
        responseHandler(res, 500, "Server error", null, true);
    }
}


const constructorService = {
    getAllConstruction,
    addConstructor,
    deleteConstructor,
    updateConstructor
}
module.exports = constructorService;