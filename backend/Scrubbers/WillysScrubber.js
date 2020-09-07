const Scrubber = require('./Scrubber');

module.exports = class WillysScrubber extends Scrubber {
  static translationSchema = {
    name = x => x.name,
    categoryId = x => getCategoryId(x),
    storeId = 'Willys',
    brand = x => x.manufacturer,
    price = x => x.priceValue,
    pricePerUnit = x => parseFloat(x.comparePrice.replace(/,/, '.')),
    quantityType = x => x.comparePriceUnit,
    discount = x => x.savingsAmount,
    labels = x => getLabels(x),
    isEcological = x => x.labels.include('ecological'),
    countryOfOrigin = async x => await getCountryOfOrigin(x)
  }

  static getCategoryId(product) {
    return 'CategoryId';
  }

  static getLabels(product) {
    return ['This', 'is', 'a', 'label'];
  }

  static async getCountryOfOrigin(product) {
    return 'Country';
  }
}