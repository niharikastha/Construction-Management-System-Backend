const dotenv = require("dotenv");
dotenv.config();
const jwt =  require("jsonwebtoken");
const User = require("../models/User.js");
const responseHandler = require("../responseHandler/response_handler") ;


const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
        return responseHandler(res, 401, "You must be logged in , key not given", null, true);
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.jwt_secret, (err, payload) => {
        if (err) {
            return responseHandler(res, 401, "You must be logged in ,token invalid", null, true);

        }
        const { _id } = payload;
        console.log(payload);
        User.findById(_id).then(userData => {
            console.log(userData,".....");
            req.userDetails = userData;
            next();
        
        })

    })


};
const authTokenRequired = {
    verifyToken
}
module.exports = authTokenRequired;

