"use strict";
const mongoose = require("mongoose"),
  Category = mongoose.model("category");

exports.getAllCategories = function (req, res) {
  Category.find({}, function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.findCategoryById = function (req, res) {
  Category.findById(req.params.categoryId, function (err, category) {
    if (err) res.send(err);
    res.json(category);
  });
};
