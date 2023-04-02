const express = require("express");
const mongoose = require("mongoose");
const app = express();

const URL = "mongodb+srv://admin:admin@cluster0.ua3esp8.mongodb.net/asg2";

// old address, would not connect to the db but keeping it in case:
//mongodb+srv://admin:admin@cluster0.ua3esp8.mongodb.net/?retryWrites=true&w=majority

const opt = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

async function connect() {
    try {
        await mongoose.connect(URL, opt);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    connect,
};