const CoopHarvester = require('./Harvesters/CoopHarvester');
const IcaHarvester = require('./Harvesters/IcaHarvester');
const IcaScrubber = require('./Scrubbers/IcaScrubber')


async function updateDatabase() {
  //let rawIcaProducts = await IcaHarvester.fetchProducts();
  //let icaScrubbedData = await IcaScrubber.scrubAll(rawIcaProducts);
  //CoopHarvester.getCategories();
}
updateDatabase();