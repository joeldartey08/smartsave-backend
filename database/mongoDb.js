const mongoose = require("mongoose");


const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connected successfully")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = mongooseConnect;