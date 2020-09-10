exports.getRandomNumber = () => {
  return (Math.random() + '').split('.')[1];
}