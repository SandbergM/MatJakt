exports.standardizedPriceFormat = (price) => {
    if (!price) { return }
    let withComma = price.toFixed(2).toString().replace(".", ",");
    let withSpace = price.toFixed(2).toString().replace(".", " ");
    return price > 999 ? withSpace : withComma;
}