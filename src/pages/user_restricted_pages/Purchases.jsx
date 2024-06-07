import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const Purchases = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    var userInfo = JSON.parse(localStorage.getItem('user'))._id;
    axios.get(`${serverAddress}/api/v1/cement-swift/order/getClientOrders?customerId=${userInfo}&status=recieved`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.orders);
          setOrders(response.data.orders);  
        }
      })
      .catch((error) => {
        console.log('Error :', error.message);
      });
  }, [])

  return (
    <div className="flex flex-col justify-start items-start gap-6">
      <h1 className="text-2xl font-semibold">My Purchases</h1>
      <div className="list_of_orders flex flex-col border-1 border-gray-400 w-full gap-5">
        {orders.length === 0 && <span className="">You do not have purchases yet.</span>}
        {orders.length !== 0 && orders.map((order, index) => (
          <div key={index} className="orderItem">
            <div className="flex justify-between items-center">
              <strong>Order {order._id}</strong>
              <Link to={`/account/purchase/${order._id}`} className="text-slate-600">View Purchases</Link>
            </div>
            <p>Total: {order.totalPrice || 0} Rwf</p>
          <small>Made On: {new Date(order.createdAt).toDateString()} - {new Date(order.createdAt).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Purchases