export function getMonthlySalesData(soldProducts, productTypes) {
  // Initialize result array
  const result = productTypes.map(product => ({
      type: product.name,
      data: new Array(12).fill(0) // 12 months, initialized to 0
  }));

    

  return result;
}