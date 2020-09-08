const Scrubber = require('./Scrubber');
const { default: fetch } = require("node-fetch");


module.exports = class IcaScrubber extends Scrubber {
    static translateSchema = {
        name: x => x.name,
        store_id: x => "ica-supermarket-linero-torg",
        categoryId: x => filterCategories(x.inCategories),
        brand: x => x.brand,
        price: x => x.price === undefined ? "N/A" : x.price,
        packagingSize: x => "TODO",// TODO
        pricePerUnit: x => x.compare === undefined ? "N/A" : x.compare.price,
        quantityType: x => x.soldInUnit === "pce" ? "st" : "kg",
        discount: x => x.promotions, // TODO
        labels: x => "N/A", // TODO
        isEcological: x => x.markings.environmental === undefined ? false : ecologicalCheck(x.markings.environmental),
        countryOfOrigin: x => x.countryOfOrigin === undefined ? "N/A" : x.countryOfOrigin.name,
        imageUrl: x => `https://assets.icanet.se/t_product_large_v1,f_auto/${x.sku}.jpg`,
    }
};
//await delay();
async function filterCategories(categories) {
    let productCategoryArray = []
    for await (category of categories) {
        translateCategory(category.slug).then(res => { console.log(res.categoryTranslation); }).catch((e) => { /*console.log(e);*/ })
    }

    return [...new Set(productCategoryArray)]
}

function ecologicalCheck(markings) {
    for (let i = 0; i < markings.length; i++) {
        if (markings[i].code === "EU_ORGANIC_FARMING") { return true }
    }
    return false;
}
async function translateCategory(id) {
    const body = fetch(`http://localhost:3000/categories/${id}`)
    return await (await body).json()
}

function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}