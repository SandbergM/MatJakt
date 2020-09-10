"use strict";
module.exports = function (app) {
    const categorytranslationsRoute = require("../controllers/CategoryTranslationController");

    app
        .route("/categorytranslations")
        .get(categorytranslationsRoute.get_all_translations)
};
