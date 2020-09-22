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
};
