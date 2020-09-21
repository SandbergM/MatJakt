"use strict";
const mongoose = require("mongoose"),
  Product = mongoose.model("product");

exports.getAllProducts = function (req, res) {
  Product.find({}, function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.findItemByName = async function (req, res) {
  let products = req.body;
  let list = [];

  for (const x of products) {
    await Product.findOne(
      {
        $query: { name: { $regex: x['name'], $options: "i" } }
      }
      , function (error, product) {
        if (!error) {
          list.push(product)
        } else {
          console.log(error);
        }
      })
  }
  res.send(list)
};
