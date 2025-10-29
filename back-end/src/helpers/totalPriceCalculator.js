//this function is used to return the total price of products
const totalPriceCalculator = (products) => {
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice =
      totalPrice +
      product.count *
        (product.discount ? product.discount.offer : product.price);
  });
  return totalPrice;
};

module.exports = totalPriceCalculator;
