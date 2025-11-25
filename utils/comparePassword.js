const bcrypt = require("bcryptjs");

const comparePassword = async  (password, hashPassword) =>{
   return bcrypt.compare(password, hashPassword);
}

module.exports = comparePassword;