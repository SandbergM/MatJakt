const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Translator = require("./Shared/CategoryTranslator");

//Harvesters
const CoopHarvester = require("./harvesters/CoopHarvester");
const IcaHarvester = require("./harvesters/IcaHarvester");
const WillysHarvester = require("./harvesters/WillyHarvester");
//Scrubbers
const CoopScrubber = require("./scrubbers/CoopScrubber");
const WillysScrubber = require("./scrubbers/WillysScrubber");
const IcaScrubber = require("./scrubbers/IcaScrubber");

//Mongoose models
const Address = require("./models/address");
const Category = require("./models/category");
const Store = require("./models/store");
const { Product, TempProduct } = require("./models/product");
const CategoryTranslation = require("./models/categoryTranslation");
const AutoCompleteSuggestion = require("./models/autoCompleteSuggestion");

//Routes
const productRoutes = require("./routes/ProductRoutes");
productRoutes(app);
const addressRoutes = require("./routes/AddressRoutes");
addressRoutes(app);
const categoryRoutes = require("./routes/CategoryRoutes");
categoryRoutes(app);
const storeRoutes = require("./routes/StoreRoutes");
storeRoutes(app);
const categorytranslationsRoutes = require("./routes/categoryTranslationRoutes");
categorytranslationsRoutes(app);
const AutoCompleteSuggestionRoutes = require("./routes/AutoCompleteSuggestionRoutes");
AutoCompleteSuggestionRoutes(app);

//connect to MongoDB with mongoose
const dbURI =
  "mongodb+srv://matjakt:FoodHunt123@mat-jakt.mpf5m.mongodb.net/mat-jakt?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3001, () => {
      console.log("Listening at port 3001...");
    })
  )
  .catch((err) => console.log(err));

async function updateDatabase() {
  let products = [];
  Translator.fetchCategories();
}
updateDatabase();
