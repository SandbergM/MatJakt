"use strict";
const mongoose = require("mongoose"),
  Store = mongoose.model("store");

exports.getAllStores = function (req, res) {
  Store.find({}, function (err, store) {
    if (err) res.send(err);
    res.json(store);
  });
};

exports.findStoreById = function (req, res) {
  Store.find(req.params.storeId, function (err, store) {
    if (err) res.send(err);
    res.json(store);
  });
};
