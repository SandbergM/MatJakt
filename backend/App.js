const CoopHarvester = require('./Harvesters/CoopHarvester');
const IcaHarvester = require('./Harvesters/IcaHarvester');
const IcaScrubber = require('./Scrubbers/IcaScrubber')


async function updateDatabase() {
  //let products = await IcaHarvester.fetchProducts();
  //let rawIcaProducts = await IcaScrubber.scrubAll(products);
  //CoopHarvester.getCategories();
  //IcaHarvester.fetchProducts();
}
updateDatabase();