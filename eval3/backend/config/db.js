const mongoose = require("mongoose");
require("dotenv").config();
async function connectionToDb(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connect to Db");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectionToDb
}