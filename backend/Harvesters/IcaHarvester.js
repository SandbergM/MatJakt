const fetch = require("node-fetch");

/* 
Todo, Store / Addres harvest
https://handla.ica.se/api/editorial-content/v1/store-info/store/ica-supermarket-linero-torg-id_15172
Store : name, websiteUrl, openingHours
Address : country, region, city, zipCode, streetNumber, streetName
*/

//https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/ica-supermarket-linero-torg-id_15172/products-data?skus="

module.exports = class IcaHarvester {

    static async getCategories() {
        let raw = await fetch("https://handla.ica.se/api/product-info/v1/store/15172/category/catalog80002")
        let categories = await raw.json();
        return await categories.childCategories.map(x => x.seoUrl);
    }

    static async getProductIds() {
        let categories = await this.getCategories();
        let productIds = [];

        for (let category of categories) {
            let res = await fetch(`
            https://handla.ica.se/api/content/v1/collections/facets/customer-type/B2C/store/ica-supermarket-linero-torg-id_15172/products?categories=${category}&sortBy=MYUSUALS&bb=true`);
            let items = await res.json();
            await productIds.push(items.items)
        }

        let cleanIds = [];

        productIds.forEach(category => {
            category.forEach(x => {
                x["type"] === "product" ? cleanIds.push(x["id"]) : "";
            })
        });

        return await cleanIds;
    }
    static async fetchProducts() {
        let productIds = await this.getProductIds();
        let products = [];
        for (let i = 0; i < productIds.length; i += 100) {
            let query = []; // Ica only allows to fetch 100 products on a single fetch
            for (let j = 0; j < 100; j++) {
                query.push(productIds[j])
            }
            let raw = await fetch(`https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/ica-supermarket-linero-torg-id_15172/products-data?skus=${query.join(",")}`)
            let res = await raw.json();
            products = [...products, ...res]
        }
        return await products;
    }
};