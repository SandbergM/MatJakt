const Scrubber = require('./Scrubber');

module.exports = class IcaScrubber extends Scrubber {
    static translateSchema = {
        store_id: x => "ica-supermarket-linero-torg",
        name: x => x.name,
        brand: x => x.brand,
        countryOfOrigin: x => x.countryOfOrigin === undefined ? "N/A" : x.countryOfOrigin.name,
        category: x => filterCategories(x.inCategories),
        price: x => x.price === undefined ? "N/A" : x.price,
        pricePerUnit: x => x.compare === undefined ? "N/A" : x.compare.price,
        quantityType: x => x.soldInUnit === "pce" ? "st" : "kg",
        discount: x => x.promotions, // TODO
        labels: x => "N/A", // TODO
        isEcological: x => x.markings.environmental === undefined ? false : ecologicalCheck(x.markings.environmental),
    }
};

function filterCategories(categories) {
    // Category id catalog80002 is "ICA Online Catalog", not relevant for the project, so we leave it out
    let productCategoryArray = []
    categories.map(category => {
        category.id != "catalog80002" ? productCategoryArray.push(category.name) : "";
        if (category.path) {
            category.path.forEach(subCategory => {
                subCategory.id != "catalog80002" ? productCategoryArray.push(subCategory.name) : "";
            });
        }
    });
    return [...new Set(productCategoryArray)]
}

function ecologicalCheck(markings) {
    for (let i = 0; i < markings.length; i++) {
        if (markings[i].code === "EU_ORGANIC_FARMING") { return true }
    }
    return false;
}