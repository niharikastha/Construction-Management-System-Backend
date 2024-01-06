const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
  
  const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  };
  
  const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  };
// const fetchUserByEmail = async(email,res)=>{
// try{
//   const user = await User.findOne({email});
//   console.log(user,"  User");
//   return user;
// }catch(err){
//   console.log(err);
//   throw err
// }
// }
//
const getUserById = async (userId, res) => {
  try {
      const user = await User.find({ _id: userId });
      return user
      // if (!user) {
          // return responseHandler(res, 400, "User is not found.must be logged in user", null, true);
      // }
  } catch (err) {
      console.log(err);
      responseHandler(res, 500, "Server error occurred", null, true);

  }
}
  module.exports = { generateToken, hashPassword, comparePasswords,  getUserById };//fetchUserByEmail
