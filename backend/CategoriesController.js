"use strict";

const { db } = require("./models/categoryTranslation");


const mongoose = require("mongoose"),
    CategoryTranslation = mongoose.model("categories");

exports.categories_by_id = function (req, res) {
    CategoryTranslation.findById(req.params.id).then((result) => { res.send(result) }).catch((err) => { res.send(err) })
};

exports.categories_all = function (req, res) {
    CategoryTranslation.find({})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.send(err)
        })
};