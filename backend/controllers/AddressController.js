"use strict";
const mongoose = require("mongoose"),
    Address = mongoose.model("address");

exports.get_all_addresses = function (req, res) {
    Address.find({}, function (err, address) {
        if (err) res.send(err);
        res.json(address);
    });
};

exports.find_address_by_id = function (req, res) {
    Address.findById(req.params.addressId, function (err, address) {
        if (err) res.send(err);
        res.json(address);
    });
};


exports.create_one_address = function (req, res) {
    let new_address = new Address(req.body);
    new_address.save((err, address) => {
        if (err) res.send(err);
        res.json(address)
    });
};

exports.update_one_address = function (req, res) {
    Address.findOneAndUpdate(
        { _id: req.params.addressId },
        req.body,
        { new: true },
        function (err, task) {
            if (err) res.send(err)
            res.json(task)
        }
    )
};