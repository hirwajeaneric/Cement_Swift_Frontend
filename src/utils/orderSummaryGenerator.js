export function getCompletedOrdersSummary(orders) {
    // Filter completed orders
  const completedOrders = orders.filter(order => order.status === 'confirmed');

  // Group completed orders by orderCode
  const groupedOrders = completedOrders.reduce((result, order) => {
    const orderCode = order.orderCode;
    const existingOrderGroup = result.find(group => group.orderCode === orderCode);

    if (existingOrderGroup) {
      // If orderCode already exists in a group, add the total
      existingOrderGroup.total += order.total;
    } else {
      // If orderCode doesn't exist in any group, create a new group
      result.push({
        orderCode: orderCode,
        total: order.total,
        orderedOn: order.completedOn, // Assuming completedOn is the date you want
      });
    }

    return result;
    }, []);

    return groupedOrders;
}

