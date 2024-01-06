
const bcrypt = require('bcrypt');
const User = require('../models/User');
const responseHandler = require('../responseHandler/response_handler');

const insertUser = async (data, res) => {
    try {

        const existUser = await User.find({ email: data.email });
        console.log(existUser, "existuser");
        if (existUser.length > 0) {
            return responseHandler(res,400,"User already exist",null,true);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);


        const add_user = new User({
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role,
            password: hashedPassword,
            confirmPassword: data.confirmPassword
        });

        await add_user.save();
        responseHandler(res, 200, "User created successfully", add_user, true);

    } catch (err) {
        console.log(err);
        responseHandler(res, 500, err, null, true);
    }
}

const adminService = {
    insertUser
}

module.exports = adminService;
