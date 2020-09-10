"use strict";

const { db } = require("./models/categoryTranslation");


const mongoose = require("mongoose"),
    CategoryTranslation = mongoose.model("categoryTranslation");

exports.categoryTranslation_by_id = function (req, res) {
    CategoryTranslation.findById(req.params.id).then((result) => { res.send(result) }).catch((err) => { res.send(err) })
};

exports.categoryTranslation_all = function (req, res) {
    CategoryTranslation.find({})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
};