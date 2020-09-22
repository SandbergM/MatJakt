const Store = require('../models/store');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  Store.find({}, (err, data) => {
    console.log(data);
    if (err) console.log(err)
    res.send(data)
  })
});

router.get('/id=:storeId', (req, res) => {
  Store.findById(req.params.storeId, function (err, data) {
    if (err) res.send(err);
    res.json(data);
  });
});

module.exports = router;