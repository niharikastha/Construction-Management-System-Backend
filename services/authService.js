const User = require('../models/User');
const authModels = require('../models/authModels');
const responseHandler = require('../responseHandler/response_handler');

const login = async (loginFields, res) => {
  try {
    const user = await User.findOne({ email: loginFields.email });//, role: loginFields.role
    console.log(user.role, "user");

    const userRole = user.role;
    if (!user) {
      return responseHandler(res, 401, "Invalid Credentials", null, true);
    }
    if (user && (user.role == 'admin' || user.role == 'project manager' || user.role == 'contractor' || user.role == 'supervisor')) {

      const passwordMatch = await authModels.comparePasswords(loginFields.password, user.password);
      console.log(loginFields.password, "password", user.password, "user.password");
      if (passwordMatch) {
        const token = authModels.generateToken(user._id);
        let responseData = {
          userRole,
          token
        }
        return responseHandler(res, 200, "User loggedIn ", responseData, false);

      } else {
        return responseHandler(res, 401, "Invalid email or password. Password does not match .", null, true);
      }

    }

  } catch (err) {
    console.log(err);
    return responseHandler(res, 400, err, null, true);
  }

}

// const signup = async (signupDetails, res) => {
//   try {
//     const user = await User.findOne({ email: signupDetails.email })
//     console.log(user, "user..");
//     if (user) {
//       throw new Error("User already exists.");
//     }
//     const hashedPassword = await authModels.hashPassword(signupDetails.password);
//     const newUser = new User({
//       email: signupDetails.email,
//       // phone: signupDetails.phone,
//       role: signupDetails.role,
//       password: hashedPassword,
//       confirmPassword: signupDetails.confirmPassword

//     });
//     await newUser.save();
//     console.log(newUser, "newUser...");
//     responseHandler(res, 200, "User created successfully", newUser, false);

//   } catch (err) {
//     console.log(err, "err");
//     responseHandler(res, 500, "Server error occurred ", null, true);
// }

// }
const signup = async (signupDetails, res) => {
  try {
    const user = await User.findOne({ email: signupDetails.email })
    console.log(user, "user..");
    if (user) {
      return responseHandler(res,400,"User already exists.",null,true);
    }
    const validRoles = ['admin'];
    if (!validRoles.includes(signupDetails.role)) {
      // throw new Error("Invalid role.");
      return responseHandler(res,400,"Invalid role.",null,true);
    }
    const hashedPassword = await authModels.hashPassword(signupDetails.password);
    const newUser = new User({
      email: signupDetails.email,
      // phone: signupDetails.phone,
      role: signupDetails.role,
      password: hashedPassword,
      confirmPassword: signupDetails.confirmPassword

    });
    await newUser.save();
    console.log(newUser, "newUser...");
    responseHandler(res, 200, "User created successfully", newUser, false);

  } catch (err) {
    console.log(err, "err");
    responseHandler(res, 500, "server error", null, true);
  }

}
const authService = {
  login,
  signup
}
module.exports = authService;




