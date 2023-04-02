const mongoose = require("mongoose");

const URL = "mongodb+srv://admin:admin@cluster0.ua3esp8.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    connect,
};