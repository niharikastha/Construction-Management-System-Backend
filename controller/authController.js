const User = require('../models/User');
const authService = require('../services/authService');
const userValidation = require('../library/userValidation');
const responseHandler = require('../responseHandler/response_handler');
const signup = async (req, res) => {
  try {
    const signupDetails = {
      email: req.body.email,
      // phone: req.body.phone,
      role: req.body.role,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword

    };

    const isValid = await userValidation.validateSignupInput(signupDetails, res);
console.log(isValid,"++++++++++++")
    if (isValid) {
      await authService.signup(signupDetails, res);  
    }

  } catch (error) {
    console.error(error);

  }
};

const login = (req, res) => {
  try {
    console.log("incoming request");
    const loginFields = {
      email: req.body.email,
      password: req.body.password,
    }
  console.log(loginFields);
    const isValid = userValidation.loginValidation(loginFields, res);
    console.log(isValid, "isValid");

    if (isValid) {
      console.log("Everything valid")
      authService.login(loginFields, res)
    } else {
      console.log("not valid")
    }

  } catch (err) {
    console.error(err);

  }
};
const authController = {
  signup,
  login
}
module.exports = authController;
