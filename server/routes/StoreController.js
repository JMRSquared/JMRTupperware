var express = require("express");
var router = express.Router();

import mongoose from "mongoose";
// import the models
import Admin from "../models/Admin";
import Customer from "../models/Customer";
import Order from "../models/Order";
import Tupperware from "../models/Tupperware";

/*
  TODO : Add admin
         Remove Admin
         Log in admin
         Get stats involving the admin
                - Notifications sent
                - 
*/

router.get("/get/tupperware/:take/:skip", function (req, res) {
  var take = Number(req.params.take);
  var skip = Number(req.params.skip);
  Tupperware.find({}, null, {
    sort: '-date',
    limit: take,
    skip: skip
  }).then(tupperwares => {
    return res.json(tupperwares);
  }).catch(err => {
    return res.status(512).send(err.message);
  });
});

router.post("/add/new/tupperware", function (req, res) {
  var _tupperware = req.body.tupperware;
  var tupperware = new Tupperware();
  tupperware.name = _tupperware.name;
  tupperware.price = _tupperware.price;
  tupperware.quantity = _tupperware.quantity;
  tupperware.img = _tupperware.img;

  Tupperware.findOne({
    name: tupperware.name,
    img: tupperware.img
  }).then(tt => {
    if (!tt) return true;
    throw "Tupperware already exist.";
  }).then(tt => {
    tupperware.save(function (err) {
      if (err) throw "Unable to save the tupperware, try again later.";
      return res.json(tupperware);
    });
  }).catch(err => {
    return res.status(512).send(err.message);
  });
});

router.post("/place/order", function (req, res) {
  var user = req.body.user;
  var tupperwareID = req.body.tupperwareID;
  if (!user) {
    return res.status(512).send("Please place an order as a user");
  } else if (!user.lastName || user.lastName.length < 3) {
    return res.status(512).send("Please enter your valid last name.");
  } else if (!user.firstName || user.firstName.length < 3) {
    return res.status(512).send("Please enter your valid first name.");
  } else if (!user.numbers || user.numbers.length != 10 || isNaN(user.numbers)) {
    return res.status(512).send(
      "Please enter your 10 digit South African valid contact number."
    );
  } else if (!tupperwareID) {
    return res.status(512).send(
      "Invalid tupperware selected."
    );
  }

  Customer.findOne({
    lastName: user.lastName.toLowerCase(),
    firstName: user.firstName.toLowerCase(),
    numbers: user.numbers
  }).then(user => {
    if (!user) {
      const customer = new Customer();
      customer.lastName = user.lastName.toLowerCase();
      customer.firstName = user.firstName.toLowerCase();
      customer.numbers = user.numbers;

      customer.save(function (err) {
        if (err) throw "Unable to save your details, try again later.";
        return customer;
      });
    } else {
      return user;
    }
  }).then(customer => {
    var order = new Order();
    order.customer = customer._id;
    order.tupperwares = [tupperwareID];
    order.message = user.message;
    order.save(function (err) {
      if (err) throw "Unable to process your order, try again later.";
      return res.send("Tupperware successfully ordered");
    })
  }).catch(err => {
    return res.status(512).send(err.message);
  })
})

module.exports = router;