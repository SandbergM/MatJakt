const { Product } = require("../models/product");

const express = require("express");
const router = express.Router();

router.post("/generateList", async (req, res) => {
  let list = [];
  for (const product of req.body) {
    let match = await Product.findOne(
      { $query: { name: { $regex: product["name"], $options: "i" } } }
    ).sort({ price: 1 });
    list.push(match);
  }
  res.send(list);
});

module.exports = router;
