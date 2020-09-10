const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Harvesters
const CoopHarvester = require("./Harvesters/CoopHarvester");
const IcaHarvester = require("./Harvesters/IcaHarvester");

//Scrubbers
const CoopScrubber = require("./Scrubbers/CoopScrubber");
const IcaScrubber = require("./Scrubbers/IcaScrubber");

//Mongoose models
const Product = require("./models/product");
const Address = require("./models/address");
const Category = require("./models/category");
const Store = require("./models/store");

//Routes
const productRoutes = require("./routes/ProductRoutes");
productRoutes(app);
const addressRoutes = require("./routes/AddressRoutes");
addressRoutes(app);
const categoryRoutes = require("./routes/CategoryRoutes");
categoryRoutes(app);
const storeRoutes = require("./routes/StoreRoutes");
storeRoutes(app);

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

}
//updateDatabase();
