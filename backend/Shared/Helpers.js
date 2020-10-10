exports.getRandomNumber = () => {
  return (Math.random() + '').split('.')[1];
}

exports.capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

exports.removePrimitiveDuplicates = (array) => Array.from(new Set(array));