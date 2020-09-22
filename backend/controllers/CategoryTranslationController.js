"use strict";
const mongoose = require("mongoose"),
  CategoryTranslation = mongoose.model("categorytranslation");

exports.getAllCategoryTranslations = function (req, res) {
  CategoryTranslation.find({}, function (err, translation) {
    if (err) res.send(err);
    res.json(translation);
  });
};
