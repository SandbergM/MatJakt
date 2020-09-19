"use strict";
const mongoose = require("mongoose"),
  AutoCompleteSuggestion = mongoose.model("autocompletesuggestion");

exports.getAutoCompleteSuggestions = function (req, res) {
  let productBeingSearched = req.params.productSearch;
  AutoCompleteSuggestion.find(
    {
      $query: { word: { $regex: productBeingSearched, $options: "i" } },
    },
    function (err, result) {
      if (err) res.send(err);
      res.send(result);
    }
  )
    .sort({ timesUsed: -1 })
    .limit(5);
};
