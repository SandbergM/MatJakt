const mongoose = require("mongoose");
const WillysHarvester = require("./WillyHarvester");
const CoopHarvester = require("./CoopHarvester");
const IcaHarvester = require("./IcaHarvester");
const WillysScrubber = require("../Scrubbers/WillysScrubber");
const CoopScrubber = require("../Scrubbers/CoopScrubber");
const IcaScrubber = require("../Scrubbers/IcaScrubber");
const { capitalizeFirstLetter } = require("../Shared/Helpers");
const { TempProduct, Product } = require("../models/product");

module.exports = class Harvester {
  constructor() {
    this.stores = {
      ica: {
        harvester: IcaHarvester,
        products: [],
        scrubber: IcaScrubber,
      },
      coop: {
        harvester: CoopHarvester,
        products: [],
        scrubber: CoopScrubber,
      },
      willys: {
        harvester: WillysHarvester,
        products: [],
        scrubber: WillysScrubber,
      },
    };
    this.scrubbedProducts = [];
    this.db = mongoose.connection.db;
  }

  async run() {
    for (let key of Object.keys(this.stores)) {
      await this.harvest(key);
      await this.scrub(key);
    }
    await this.writeProductsToDatabase();
  }

  async harvest(key) {
    const capitalizedKey = capitalizeFirstLetter(key);
    const startTime = Date.now();

    console.log(`${capitalizedKey} harvesting commenced...`);

    this.stores[key].products = await this.stores[
      key
    ].harvester.getAllProducts();

    console.log(
      `${capitalizedKey} harvesting completed in ${Date.now() - startTime} ms.`
    );
  }

  async scrub(key) {
    const capitalizedKey = capitalizeFirstLetter(key);
    let startTime = Date.now();

    console.log(`${capitalizedKey} scrubbing commenced...`);

    const scrubbedProducts = await this.stores[key].scrubber.scrubAll(
      this.stores[key].products
    );
    this.scrubbedProducts.push(...scrubbedProducts);

    console.log(
      `${capitalizedKey} scrubbing completed in ${Date.now() - startTime} ms.`
    );
  }

  async writeProductsToDatabase() {
    console.log(`Commencing database write operation...`);
    let startTime = Date.now();
    await TempProduct.collection.insertMany(this.scrubbedProducts);
    Product.collection.drop();
    await this.db.collection("tempproducts").rename("products");
    console.log(
      `Database write operation completed in ${Date.now() - startTime} ms.`
    );
  }
};
