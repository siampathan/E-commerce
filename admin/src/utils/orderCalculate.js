// Function to filter orders
export const filterdOrders = (orders, gender) => {
  return orders.filter(
    (order) =>
      order.status === "Delivered" &&
      order.items.some((item) => item.category === gender)
  );
};

//Function to calculate total Quantity of Sell
// export const totalQuantity = (orders, category) => {
//   const filteredOrders = filterdOrders(orders, category);

//   return filteredOrders.reduce((total, order) => {
//     const menItems = order.items.filter((item) => item.category === category);
//     return total + menItems.length; // Count the number of items
//   }, 0);
// };

export const totalQuantity = (orders, category) => {
  const filteredOrders = filterdOrders(orders, category);

  return filteredOrders.reduce((total, order) => {
    const itemsInCategory = order.items.filter(
      (item) => item.category === category
    );
    // Sum the quantities of items in the specified category
    const quantitySum = itemsInCategory.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return total + quantitySum; // Add to the total
  }, 0);
};

// Function to calculate total price with gender
export const calculatePrice = (filteredOrders, gender) => {
  return filteredOrders.reduce((total, order) => {
    const menItems = order.items.filter((item) => item.category === gender);
    const priceSum = menItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total + priceSum;
  }, 0);
};
