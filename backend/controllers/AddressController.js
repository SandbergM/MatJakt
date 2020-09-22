"use strict";
const mongoose = require("mongoose"),
  Address = mongoose.model("address");

exports.getAllAddresses = function (req, res) {
  Address.find({}, function (err, address) {
    if (err) res.send(err);
    res.json(address);
  });
};

exports.findAddressById = function (req, res) {
  Address.findById(req.params.addressId, function (err, address) {
    if (err) res.send(err);
    res.json(address);
  });
};
