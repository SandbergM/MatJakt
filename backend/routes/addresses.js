const Address = require('../models/address');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  Address.find({}, (err, data) => {
    if (err) console.log(err)
    res.send(data)
  })
});

router.get('/id=:addressId', (req, res) => {
  Address.findById(req.params.addressId, function (err, address) {
    if (err) res.send(err);
    res.json(address);
  });
});

module.exports = router;