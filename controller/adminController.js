const adminService = require('../services/adminService');
const userValidation = require('../library/userValidation');
const responseHandler = require('../responseHandler/response_handler')

const addUser = (req, res) => {
    try {
        const user_details = req.userDetails;
        console.log(user_details, "- user details");

        if (user_details.role !== "admin") {
            return responseHandler(res, 401, "Invalid token.Please enter a valid token", null, true);
        }
       
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }
        const validated = userValidation.fieldValidation(data, res);
        console.log(validated, "validated user");

        if (validated) {
            adminService.insertUser(data,res);
        }
    } catch (err) {
        console.log(err);
    }
}

const adminController ={
    addUser ,

}

module.exports = adminController;