"use strict";
const mongoose = require("mongoose"),
  Product = mongoose.model("product");

exports.getAllProducts = function (req, res) {
  Product.find({}, function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.findProductById = function (req, res) {
  Product.findById(req.params.taskId, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
