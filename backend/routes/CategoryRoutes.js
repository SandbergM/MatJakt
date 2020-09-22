"use strict";
module.exports = function (app) {
  const categoriesRoute = require("../controllers/CategoryController");

  app.route("/categories").get(categoriesRoute.getAllCategories);

  app.route("/categories/:categoryId").get(categoriesRoute.findCategoryById);
};
