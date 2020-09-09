const CoopHarvester = require("./Harvesters/CoopHarvester");
const CoopScrubber = require("./Scrubbers/CoopScrubber");
const WillysHarvester = require("./Harvesters/WillyHarvester");
const WillysScrubber = require("./Scrubbers/WillysScrubber");
const IcaHarvester = require("./Harvesters/IcaHarvester");
const IcaScrubber = require("./Scrubbers/IcaScrubber");
const Translator = require("./Shared/Translator");
const { Product, TempProduct } = require("./models/product");
const categoryTranslation = require("./models/categoryTranslation");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const routesCat = require("./categoryTranslationRoutes"); //importing routes
const routes = require("./RestRoutes"); //importing routes

routes(app); //register the routes
routesCat(app); //register the routes

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
  let products = [];



  setTimeout(() => {
    Translator.fetchCategories();
  }, 2000)

  let startTime = Date.now();
  let coop = await CoopHarvester.getAllProducts();
  let coopScrubbed = await CoopScrubber.scrubAll(coop);
  console.log(" Coopharvesting completed", coopScrubbed.length, Date.now() - startTime);
  products.push(...coopScrubbed);

  startTime = Date.now();
  let willys = await WillysHarvester.getAllProducts();
  let willysScrubbed = await WillysScrubber.scrubAll(willys);
  console.log(" Willysharvesting completed", willysScrubbed.length, Date.now() - startTime);
  products.push(...willysScrubbed);

  startTime = Date.now();

  let ica = await IcaHarvester.getAllProducts();
  let icaScrubbed = await IcaScrubber.scrubAll(ica);
  console.log(icaScrubbed);
  console.log(" Icasharvesting completed", icaScrubbed.length, Date.now() - startTime);
  products.push(...icaScrubbed);

  startTime = Date.now();

  let db = mongoose.connection.db;

  await TempProduct.collection.insertMany(products);

  console.log("Database write took : ", Date.now() - startTime);
  startTime = Date.now();
  Product.collection.drop();
  await db.collection("tempproducts").rename("products");
  console.log("Database down for : ", Date.now() - startTime);

}
updateDatabase();