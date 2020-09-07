const CoopHarvester = require('./Harvesters/CoopHarvester');
const CoopScrubber = require('./Scrubbers/CoopScrubber');
const IcaHarvester = require('./Harvesters/IcaHarvester');
const IcaScrubber = require('./Scrubbers/IcaScrubber');


async function updateDatabase() {
  //let rawIcaProducts = await IcaHarvester.fetchProducts();
  //let icaScrubbedData = await IcaScrubber.scrubAll(rawIcaProducts);
  
  let rawCoopProducts = await CoopHarvester.getAllProducts();
  let coopScrubbedData = await CoopScrubber.scrubAll(rawCoopProducts);
  console.log(coopScrubbedData);
}
updateDatabase();
