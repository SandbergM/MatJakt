const Scrubber = require('./Scrubber');

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

function filterCategories(categories) {
    let productCategoryArray = []
    categories.map(category => {
        standardCategories.forEach(x => {
            category.name = category.name.replace(/,/g, " &")
            category.name.toLowerCase().includes(x.toLowerCase()) ? productCategoryArray.push(x) : "";
        });
        if (category.path) {
            category.path.forEach(subCategory => {
                subCategory.name = subCategory.name.replace(/,/g, " &")
                standardCategories.forEach(x => {
                    subCategory.name.toLowerCase().includes(x.toLowerCase()) ? productCategoryArray.push(x) : "";
                });
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


// temporary array
var standardCategories = [
    "Mejeri & Ägg",
    "Ost",
    "Frukt & Grönsaker",
    "Skafferi",
    "Kött & Fågel",
    "Chark & Pålägg",
    "Vegetariskt",
    "Fisk & Skaldjur",
    "Dryck",
    "Bröd & Bageri",
    "Smaksättare",
    "Färdigmat",
    "Hem & Hushåll",
    "Frys",
    "Barn",
    "Skönhet & Hygien",
    "Hälsa & Tillskott",
    "Tobak",
    "Husdjur",
    "Världens Mat"
] 