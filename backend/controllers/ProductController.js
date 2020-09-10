"use strict";
const mongoose = require("mongoose"),
  Product = mongoose.model("product");

exports.get_all_products = function (req, res) {
  Product.find({}, function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.create_one_product = function (req, res) {
  var new_product = new Product(req.body);
  new_product.save(function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.get_one_product = function (req, res) {
  Product.findById(req.params.taskId, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_one_product = function (req, res) {
  Product.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function (err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};
