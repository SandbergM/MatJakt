const { Product } = require("../models/product");
const ShoppingListService = require("../services/ShoppingListService");
const express = require("express");
const ProductService = require("../services/ProductService");
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

router.post("/generate-list", async (req, res) => {
  let query = req.body;
  const products = await ShoppingListService.generateList(query);
  res.json(products);
});

router.post("/test", async (req, res) => {
  let query = req.body;
  const products = await ProductService.findProductsByQuery({
    name: new RegExp(query[0].name, "i"),
    storeId: "5f59e826f158c91676980f44",
  });
  res.json(products);
})

router.post("/singleProductSearch", async (req, res) => {
  let stores = { "5f59e877f158c91676980f45": [], "5f59e826f158c91676980f44": [], "5f59e688f158c91676980f43": [] };
  for (let [key, value] of Object.entries(stores)) {
    let data = await Product.find({ $query: { storeId: { $regex: key, $options: "i" }, name: { $regex: req.body.name, $options: "i" } } }).limit(5);
    value.push(...data)
  }
  res.send(stores)
});

module.exports = router;
