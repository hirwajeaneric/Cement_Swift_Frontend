export function getMonthlyProductData(items, productTypes) {
  const productData = productTypes.reduce((acc, product) => {
    acc[product.name] = Array(12).fill(0);
    return acc;
  }, {});

  items.forEach(item => {
    const month = new Date(item.createdAt).getMonth();
    if (productData[item.productName]) {
      productData[item.productName][month] += item.quantity;
    }
  });

  return productData;
}
