const { Product } = require("../models/product");
const ProductService = require("../services/productService");
const ShoppingListService = require("../services/ShoppingListService");

const express = require("express");
const router = express.Router();

router.post("/generateList", async (req, res) => {
  let list = [];
  for (const product of req.body) {
    await Product.findOne(
      { $query: { name: { $regex: product["name"], $options: "i" } } },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          list.push(data);
        }
      }
    ).sort({ price: 1 });
  }
  res.send(list);
});

router.get("/test", async (req, res) => {
  const products = await ShoppingListService.generateList([
    {
      name: "mjölk",
      isEcological: true,
    },
    {
      name: "potatis",
    },
  ]);
  res.json(products);
});

module.exports = router;
