var express = require("express");
var router = express.Router();

import mongoose from "mongoose";
// import the models
import Admin from "../models/Admin";
import Customer from "../models/Customer";
import Order from "../models/Order";

router.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == 'joe' && password == "joe") {
        return res.send('joe');
    } else {
        return res.status(512).send("Incorrect login details");
    }
})

module.exports = router;