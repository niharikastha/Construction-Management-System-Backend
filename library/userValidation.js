const validators = require('../library/validation');
const responseHandler = require('../responseHandler/response_handler');

const validateSignupInput = async (signupDetails, res) => {
    try {
        if (!signupDetails.email || !signupDetails.role || !signupDetails.password || !signupDetails.confirmPassword) {// || !signupDetails.phone
            return responseHandler(res, 400, "All fields are required .", null, true);
        } else {
            validators.validEmail(signupDetails.email);
            // validators.validPhone(signupDetails.phone);
            validators.validAdminRole(signupDetails.role);
            validators.validPassword(signupDetails.password);
            validators.validConfirmPassword(signupDetails.password, signupDetails.confirmPassword);
            return true
        }

    } catch (err) {
        console.log(err, "err")
        responseHandler(res, 400, err, null, true);
        return false
    }

}
const loginValidation = async (loginFields, res) => {
    console.log(loginFields, "..");
    try {
        if (!loginFields.email || !loginFields.password) {//|| !loginFields.role
            return responseHandler(res, 422, "Please add email and password", null, true);
        } else {
            validators.validEmail(loginFields.email);
            validators.validPassword(loginFields.password);
            // validators.validRole(loginFields.role);//validadminRole
            return true;

        }

    } catch (err) {
        console.log(err, "++++");
        responseHandler(res, 400, err, null, true);
    }
};
const fieldValidation = async (data, res) => {
    console.log(data, "Validation");
    try {
        if (!data.name || !data.email || !data.role || !data.password || !data.confirmPassword) {//data.phone
            return responseHandler(res, 422, "Please add email,password and role", null, true);
        } else {
            validators.validSmallCapitalData(data.name);
            validators.validEmail(data.email);
            // validators.validPhone(data.phone);
            validators.validRole(data.role);
            validators.validPassword(data.password);
            validators.validConfirmPassword(data.password, data.confirmPassword);

            return true;
        }
    } catch (err) {
        console.log(err);
        responseHandler(res, 400, err, null, true);
    }
}
const projectValidation = (data, res) => {
    try {
        if (!data.projectName || !data.location || !data.price || !data.description) {
            return responseHandler(res, 422, "Please fill all Fields", null, true);
        } else {
           
            return true
        }
    }
    catch (err) {
        console.log(err);
        responseHandler(res, 400, err, null, true);
        return false
    }
}


const deleteProjectValidation = (projectId, res) => {
    try {
        validators.validString(projectId);
        return true
    } catch (err) {
        console.log(err);
        responseHandler(res, 400, err, null, true);
        return false
    }

}
const checkEmail = (email, res) => {
    try {
        validators.validEmail(email, res);
        return true


    } catch {
        console.log(err);
        responseHandler(res, 400, err, null, true);
        return false

    }
}

const constructorValidation = (constructor, res) => {
    try {
        //!constructor. projectId 
        if (!constructor.constructionName || !constructor.assignment || !constructor.price || !constructor.description) {//!constructor.startDate||!constructor.dueDate
            return responseHandler(res, 422, "Please fill all Fields", null, true);
        } else {
            validators.validSmallCapitalData(constructor.constructionName);
            validators.validSmallCapitalData(constructor.assignment);
            validators.validNumber(constructor.price);
            validators.validSmallCapitalData(constructor.description);
            return true
        }
    } catch (err) {
        console.log(err, "err");
        responseHandler(res, 400, err, null, true);
        return false
    }

}

const updateConstructorValidation = (constructorId, constructor, res) => {
    try {
        validators.validString(constructorId);
        if (typeof constructor.constructionName !== 'undefined') {
            validators.validString(constructor.constructionName);
        }
        if (typeof constructor.assignment !== 'undefined') {
            validators.validSmallCapitalData(constructor.assignment);
        }

        if (typeof constructor.price !== 'undefined') {
            validators.validNumber(data.price);
        }
        if (typeof constructor.description !== 'undefined') {
            validators.validSmallCapitalData(data.description);
        }
        return true
    } catch (err) {
        console.log(err);
        responseHandler(res, 400, err, null, true);
        return false
    }
}
const deleteConstructorValidation = (constructorId,res) => {
    try {
        validators.validConstructorString(constructorId);
        return true
    } catch (err) {
        console.log(err);
        responseHandler(res, 400, err, null, true);
    }
}

const userValidation = {
    checkEmail,
    validateSignupInput,
    loginValidation,
    fieldValidation,
    projectValidation,
    deleteProjectValidation,
    constructorValidation,
    updateConstructorValidation,
    deleteConstructorValidation
}
module.exports = userValidation;
