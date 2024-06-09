import { useEffect, useState } from "react";
import axios from "axios";
import OrdersTable from "../../components/tables/OrdersTable";
import { useSearchParams } from "react-router-dom";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const OrdersDash = () => {
  const [orders, setOrders] = useState([]);
  const [searchParams, setSetSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`${serverAddress}/api/v1/cement-swift/order/list`)
      .then((response) => {
        if (response.status === 200) {
          response.data.orders.map(order => {
            order.id = order._id;
            return order;
          });
          var fetchedOrders = response.data.orders;
          var orders = [];
          fetchedOrders.forEach(order => {
            orders.push({
              id: order._id,
              customer: order.customer.fullName,
              phone: order.customer.phone,
              status: order.status,
              total: order.totalPrice,
              paidOn: order.paidOn,
              location: order.delivery.province + ", " + order.delivery.district + ", " + order.delivery.streetAddress,
              createdAt: order.createdAt,
              updatedAt: order.updatedAt
            });
          });
          setOrders(orders);
        }
      })
      .catch((error) => {
        console.log('Error :', error.message);
      });
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex mb-6 justify-between">
        <h1 className="text-2xl font-bold">{searchParams.get('status')} Orders</h1>
      </div>
      <OrdersTable data={orders} />
    </div>
  )
}

export default OrdersDash