const CoopHarvester = require("./Harvesters/CoopHarvester");
const CoopScrubber = require("./Scrubbers/CoopScrubber");
const IcaHarvester = require("./Harvesters/IcaHarvester");
const IcaScrubber = require("./Scrubbers/IcaScrubber");
const Product = require("./models/product");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const routesCat = require("./CategoriesRoutes"); //importing routes
const routes = require("./RestRoutes"); //importing routes

routes(app); //register the routes
routesCat(app); //register the routes

let categoryTranslationRegister = [];


//connect to MongoDB with mongoose
const dbURI =
  "mongodb+srv://SandbergM:asdf@matjakt.qb4vo.mongodb.net/MatJakt?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3000, () => {
      console.log("Listening at port 3000...");
    })
  )
  .catch((err) => console.log(err));



async function updateDatabase() {
  let rawIcaProducts = await IcaHarvester.fetchProducts();
  let icaScrubbedData = await IcaScrubber.scrubAll(rawIcaProducts);
  //console.log(icaScrubbedData);
}
updateDatabase();