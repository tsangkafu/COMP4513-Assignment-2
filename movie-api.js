const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const express = require("express");
const db = require("./database");

const app = express();

db.connect();

app.listen(8080, () => {
    console.log("Server started on port 8080");
})