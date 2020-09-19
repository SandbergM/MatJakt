"use strict";
module.exports = function (app) {
  const AutoCompleteSuggestionRoute = require("../controllers/AutocompleteSuggestionController");

  app
    .route("/autoCompleteSuggestion/:productSearch")
    .get(AutoCompleteSuggestionRoute.getAutoCompleteSuggestions);
};
