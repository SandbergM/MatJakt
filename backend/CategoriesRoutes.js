"use strict";
module.exports = function (app) {
    var restRoute = require("./CategoriesController");

    app
        .route("/categories/:id")
        .get(restRoute.categories_by_id)
    app
        .route("/categories")
        .get(restRoute.categories_all)
};
