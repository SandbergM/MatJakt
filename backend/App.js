const CoopHarvester = require('./Harvesters/CoopHarvester');

CoopHarvester.getCategories();


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