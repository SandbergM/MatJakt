const CoopHarvester = require("./Harvesters/CoopHarvester");
const CoopScrubber = require("./Scrubbers/CoopScrubber");
const IcaHarvester = require("./Harvesters/IcaHarvester");
const IcaScrubber = require("./Scrubbers/IcaScrubber");
const Product = require("./models/product");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const routes = require("./RestRoutes"); //importing routes
routes(app); //register the routes

//connect to MongoDB with mongoose
const dbURI =
  "mongodb+srv://matjakt:FoodHunt123@mat-jakt.mpf5m.mongodb.net/mat-jakt?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3000, () => {
      console.log("Listening at port 3000...");
    })
  )
  .catch((err) => console.log(err));

async function updateDatabase() {
  //let rawIcaProducts = await IcaHarvester.fetchProducts();
  //let icaScrubbedData = await IcaScrubber.scrubAll(rawIcaProducts);

  let rawCoopProducts = await CoopHarvester.getAllProducts();
  let coopScrubbedData = await CoopScrubber.scrubAll(rawCoopProducts);
  console.log(coopScrubbedData);
}
//updateDatabase();
