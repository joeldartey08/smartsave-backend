const {validationResult} = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = {}

    if(Object.keys(errors.errors).length === 0){
        next();
    }else{
        errors.errors.forEach(element => {
            mappedErrors[element.path] = element.msg;
        });
    }
}

module.exports = validate;