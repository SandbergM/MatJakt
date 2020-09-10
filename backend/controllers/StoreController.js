"use strict";
const mongoose = require("mongoose"),
    Store = mongoose.model("store");

exports.get_all_stores = function (req, res) {
    Store.find({}, function (err, store) {
        if (err) res.send(err);
        res.json(store);
    });
};

exports.create_one_store = function (req, res) {
    let new_store = new Store(req.body);
    new_store.save((err, store) => {
        if (err) res.send(err)
        res.json(store)
    })
};

exports.find_store_by_id = function (req, res) {
    Store.find(req.params.storeId, function (err, store) {
        if (err) res.send(err);
        res.json(store);
    });
};

exports.find_store_by_id = function (req, res) {
    Store.find(req.params.storeId, function (err, store) {
        if (err) res.send(err);
        res.json(store);
    });
};

exports.update_one_store = function (req, res) {
    Store.updateOne.findOneAndUpdate(
        { _id: req.params.storeId },
        req.body,
        { new: true },
        function (err, task) {
            if (err) res.send(err)
            res.json(task)
        }
    )
};