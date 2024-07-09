// Function to generate monthly order statistics
export const generateMonthlyOrderStats = (orders) => {
    const monthlyOrderCounts = Array(12).fill(0);
    orders.forEach(order => {
      const month = new Date(order.createdAt).getMonth();
      monthlyOrderCounts[month]++;
    });
    return monthlyOrderCounts;
  }