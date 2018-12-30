var express = require("express");
var router = express.Router();

import mongoose from "mongoose";
// import the models
import Admin from "../models/Admin";
import Customer from "../models/Customer";
import Order from "../models/Order";
import Tupperware from "../models/Tupperware";
import SMSProvider from '../services/SMSProvider'

/*
  TODO : Add admin
         Remove Admin
         Log in admin
         Get stats involving the admin
                - Notifications sent
                - 
*/
const SMS = new SMSProvider();
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
  Tupperware.findById(_tupperware._id).then(exists => {
    if (!exists) {
      throw "Does not exist";
    } else {
      exists.name = _tupperware.name;
      exists.price = _tupperware.price;
      exists.quantity = _tupperware.quantity;
      exists.img = _tupperware.img;
      exists.save(function (err) {
        if (err) throw "Unable to save the tupperware, try again later.";
        return res.json(exists);
      });
    }
  }).catch(er => {
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

  console.log(user)
  console.log(tupperwareID)
  Customer.findOne({
    lastName: user.lastName.toLowerCase(),
    firstName: user.firstName.toLowerCase(),
    numbers: user.numbers
  }).then(async u => {
    if (!u) {
      const customer = new Customer();
      customer._id = mongoose.Types.ObjectId();
      customer.lastName = user.lastName.toLowerCase();
      customer.firstName = user.firstName.toLowerCase();
      customer.numbers = user.numbers;

      var saved = await customer.save();
      if (!saved) throw "Unable to save your details, try again later."
      return customer;
    } else {
      return u;
    }
  }).then(customer => {
    console.log("customer", customer);
    var order = new Order();
    order._id = mongoose.Types.ObjectId();
    order.customer = customer._id;
    order.tupperwares = [tupperwareID];
    order.message = user.message;
    order.save(function (err) {
      if (err) throw err;
      SMS.sendSMS('+27760487292',
        `Hellow , my name is ${customer.lastName} ${customer.firstName} and i would like to order a tupperware , ${tupperwareID} .... please get back to me on ${customer.numbers}`
      ).then(results => {
        return res.send(results);
      }).catch(err => {
        return res.status(512).send(err.message);
      });
    })
  }).catch(err => {
    return res.status(512).send(err.message);
  })
})

module.exports = router;