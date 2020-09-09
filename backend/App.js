const CoopHarvester = require('./Harvesters/CoopHarvester');
const IcaHarvester = require('./Harvesters/IcaHarvester');
const WillyHarvester = require('./Harvesters/WillyHarvester');

const fs = require('fs');

//CoopHarvester.getCategories();
//IcaHarvester.fetchProducts();

async function test() {
  let x = await WillyHarvester.getAllProducts();
  console.log(x.length + " Products fetched");
}
test()
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
}



 */