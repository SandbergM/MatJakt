"use strict";
const mongoose = require("mongoose"),
    Category = mongoose.model("category");

exports.get_all_categories = function (req, res) {
    Category.find({}, function (err, product) {
        if (err) res.send(err);
        res.json(product);
    });
};

exports.find_category_by_id = function (req, res) {
    Category.findById(req.params.categoryId, function (err, category) {
        if (err) res.send(err);
        res.json(category);
    });
};

exports.create_one_category = function (req, res) {
    let new_category = new Category(req.body)
    new_category.save((err, category) => {
        if (err) res.send(err);
        res.json(category)
    });
};

exports.update_one_category = function (req, res) {
    Category.findOneAndUpdate(
        { _id: req.params.categoryId },
        req.body,
        { new: true },
        function (err, task) {
            if (err) res.send(err)
            res.json(task)
        }
    )
};