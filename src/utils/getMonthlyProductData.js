// export function getMonthlyProductData(items, productTypes) {
//   const productData = productTypes.reduce((acc, product) => {
//     acc[product.name] = Array(12).fill(0);
//     return acc;
//   }, {});

//   items.forEach(item => {
//     const month = new Date(item.createdAt).getMonth();
//     if (productData[item.productName]) {
//       productData[item.productName][month] += item.quantity;
//     }
//   });

//   return productData;
// }

export function getMonthlyProductData(items, productTypes) {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    totalData: productTypes.map(product => ({
      productName: product.name,
      totalQuantity: 0,
      // Add additional properties for total amount, etc. if needed
    })),
  }));

  items.forEach(item => {
    const month = new Date(item.createdAt).getMonth();
    const productIndex = months[month].totalData.findIndex(
      product => product.productName === item.productName
    );
    if (productIndex > -1) {
      months[month].totalData[productIndex].totalQuantity += item.quantity;
      // Update additional properties based on your data (e.g., total amount)
    }
  });

  return months;
}