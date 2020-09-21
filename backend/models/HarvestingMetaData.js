const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const harvestingMetaData = new Schema({
  lastHarvestTime: { type: Number, required: true},
  harvesterIsRunning: { type: Boolean, required: true }
});

module.exports = mongoose.model("harvestingMetaData", harvestingMetaData)