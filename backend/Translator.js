
let categories = new Map();
const { default: fetch } = require("node-fetch");
module.exports = class Translator {
    // Method that scrubs a product 
    // based on the translateSchema in our subClass
    static async fetchCategories() {
        let data = fetch(`http://localhost:3000/categories`)
        try {
            let dataJson = await (await data).json();
            Object.entries(dataJson).map(obj => {
                categories.set(obj[1]["_id"], obj[1]["categoryTranslation"])
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    // Scrub a whole array of products
    static categories() {
        return categories;
    }

}