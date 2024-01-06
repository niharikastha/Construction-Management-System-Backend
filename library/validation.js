const validator = require('validator');


// valid email
const validEmail = (email) => {
  console.log(email, "email is valid")
  if (!validator.isEmail(email)) {
    console.log("email is invalid");
    throw 'Email is invalid'
  }
}

// valid password
const validPassword = (password) => {
//   if (password && password.length < 6) {
//     console.log("invalid password");
//     throw 'Password must be at least 6 characters long';
//   }
// }
const regexPassword =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const validPass = regexPassword.test(password);
  console.log(validPass, "....");


  if (!validPass) {
    throw `${password}is invalid. Your password must be atleast 8 characters long, with one upper case,lower case character, one number and a special character.`;
  }
  console.log(validPass, "password");
}
//valid confirm password
const validConfirmPassword = (password, confirmPassword) => {

if(password!== confirmPassword){
  throw "Password or Confirm Password are not same .Please enter a same Password";
    
}
  }
  

//valid name
const validSmallCapitalData = (name) => {
  // console.log(name, "1  data");
  name = name.trim();
  const regex = /[^a-zA-Z0-9\s]/;
  // console.log(name,"2")
  let validName = regex.test(name);
  console.log(validName, "/")
  if (validName == true) {
    console.log("Name is invalid")
    throw "Name is Invalid"
  }else{
    console.log("valid");
  }
};


  function validPhone(phone) {
    if (!phone) {
       return true;
    }
    const number =/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    let valid = number.test(phone);
    if (!valid) {
      throw 'Invalid phone number';
    }else{
      console.log("valid")
    }
}

//valid Role
const validRole = (role) => {
  if (!role || !['project manager', 'contractor', 'supervisor'].includes(role)) {
    throw 'Invalid role';
  } else {
    console.log("role valid");
  }
}
//
const validAdminRole = (role)=>{
  if (!role || !['admin'].includes(role)) {
    throw 'Invalid role';
  } else {
    console.log("role valid");
  }
}
//valid number
const validNumber = (data) => {
  if (isNaN(data)) {
    throw "Invalid Number";
  }
}

//valid string
const validString =(data)=>{
  if (!data || data == null || data == "") {
    throw " Project name is required. Please enter a valid  Project name ";
}

}
// valid constructor id
const validConstructorString =(data)=>{
  if (!data || data == null || data == "") {
    throw " Project name is required. Please enter a valid  Project name ";
}
}
const validators = {
  validEmail,
  validPassword,
  validRole,
  validAdminRole,
  validSmallCapitalData,
  validPhone,
  validConfirmPassword,
  validNumber,
  validString,
  validConstructorString
}

module.exports = validators;