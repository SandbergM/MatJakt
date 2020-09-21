// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// //Mongoose models
// const Address = require("./models/address");
// const Category = require("./models/category");
// const Store = require("./models/store");
// const { Product, TempProduct } = require("./models/product");
// const CategoryTranslation = require("./models/categoryTranslation");

// const Translator = require("./Shared/Translator");

// //Harvesters
// const CoopHarvester = require("./harvesters/CoopHarvester");
// const IcaHarvester = require("./harvesters/IcaHarvester");
// const WillysHarvester = require("./harvesters/WillyHarvester");
// //Scrubbers
// const CoopScrubber = require("./scrubbers/CoopScrubber");
// const WillysScrubber = require("./scrubbers/WillysScrubber");
// const IcaScrubber = require("./scrubbers/IcaScrubber");

// //Routes
// const productRoutes = require("./routes/ProductRoutes");
// productRoutes(app);
// const addressRoutes = require("./routes/AddressRoutes");
// addressRoutes(app);
// const categoryRoutes = require("./routes/CategoryRoutes");
// categoryRoutes(app);
// const storeRoutes = require("./routes/StoreRoutes");
// storeRoutes(app);
// const categorytranslationsRoutes = require("./routes/categoryTranslationRoutes");
// categorytranslationsRoutes(app);
const Server = require("./Server");

//connect to MongoDB with mongoose
// const dbURI =
//   "mongodb+srv://matjakt:FoodHunt123@mat-jakt.mpf5m.mongodb.net/mat-jakt?retryWrites=true&w=majority";

// let startTime = Date.now();
// mongoose
//   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((result) => {
//     console.log("It took", Date.now() - startTime, " ms to connect to MongoDB");
//     app.listen(3000, () => {
//       console.log("Listening at port 3000...");
//     });
//   })
//   .catch((err) => console.log(err));

// async function updateDatabase() {
//   let products = [];

//   setTimeout(() => {
//     Translator.fetchCategories();
//   }, 3000);

//   let startTime = Date.now();
//   let coop = await CoopHarvester.getAllProducts();
//   let coopScrubbed = await CoopScrubber.scrubAll(coop);
//   console.log(
//     " Coopharvesting completed",
//     coopScrubbed.length,
//     Date.now() - startTime
//   );
//   products.push(...coopScrubbed);

//   startTime = Date.now();
//   let willys = await WillysHarvester.getAllProducts();
//   let willysScrubbed = await WillysScrubber.scrubAll(willys);
//   console.log(
//     " Willysharvesting completed",
//     willysScrubbed.length,
//     Date.now() - startTime
//   );
//   products.push(...willysScrubbed);

//   startTime = Date.now();

//   let ica = await IcaHarvester.getAllProducts();
//   let icaScrubbed = await IcaScrubber.scrubAll(ica);
//   console.log(icaScrubbed);
//   console.log(
//     " Icasharvesting completed",
//     icaScrubbed.length,
//     Date.now() - startTime
//   );
//   products.push(...icaScrubbed);

//   startTime = Date.now();

//   let db = mongoose.connection.db;

//   await TempProduct.collection.insertMany(products);

//   console.log("Database write took : ", Date.now() - startTime);
//   startTime = Date.now();
//   Product.collection.drop();
//   await db.collection("tempproducts").rename("products");
//   console.log("Database down for : ", Date.now() - startTime);
// }
// updateDatabase();


class App {

  constructor(){
    // Start the web server
    new Server();
    // Start the harvester scheduler
    // write a HarvesterWatcher that checks time of last harvest
    // (we need to save in the db)
    // it might check once a minute and if now - last time > 24 hours
    // start a new harvest
    // do not start if harvestInProgrsss = true
    new HarvesterScheduler();
  }


  // console.log("Database write took : ", Date.now() - startTime);
  // startTime = Date.now();
  // Product.collection.drop();
  // await db.collection("tempproducts").rename("products");
  // console.log("Database down for : ", Date.now() - startTime);
}

new App();
