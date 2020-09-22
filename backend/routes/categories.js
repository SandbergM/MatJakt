const Category = require('../models/category');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  Category.find({}, (err, data) => {
    if (err) console.log(err)
    res.send(data)
  })
});

module.exports = router;