//this function returns the product price and stock and discount

export const createPriceAndStockObj = (obj: any) => {
  const priceAndStockObj: any = {
    price: obj.price,
    discount: null,
    percent: null,
    stock: obj.stock,
  };
  if (obj.discount) {
    priceAndStockObj.discount = obj.discount;
    priceAndStockObj.percent = Math.round(
      ((obj.price - obj.discount.offer) * 100) / obj.price
    );
  }
  return priceAndStockObj;
};
