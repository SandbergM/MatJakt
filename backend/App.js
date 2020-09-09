const CoopHarvester = require("./Harvesters/CoopHarvester");
const IcaHarvester = require("./Harvesters/IcaHarvester");
const WillyHarvester = require("./Harvesters/WillyHarvester");
const WillysScrubber = require("./Scrubbers/WillysScrubber");

const fs = require("fs");
const IcaScrubber = require("./Scrubbers/IcaScrubber");

async function test() {
  let products = await WillyHarvester.getAllProducts();
  let scrubbed = await WillysScrubber.scrubAll(products);
  console.log(scrubbed);
}
test();
/*
async function getdata() {
  let data = await CoopHarvester.getCategories();
  let categories = [];
  for (product of data.products) {
    for (category in product.categories)
    categories.push(product.categories[category].name);
  }

  //console.log(data.products[0].categories[0].name);
  console.log(categories);
async function updateDatabase() {
  //let rawIcaProducts = await IcaHarvester.fetchProducts();
  //let icaScrubbedData = await IcaScrubber.scrubAll(rawIcaProducts);
  //CoopHarvester.getCategories();
}
updateDatabase();
*/
