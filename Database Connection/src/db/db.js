const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect("mongodb+srv://Hemant_446:Hemant_446@backenbd-dev.n5pvrqz.mongodb.net/first");
    console.log("Connected to Database");
}

module.exports = connectDB;
