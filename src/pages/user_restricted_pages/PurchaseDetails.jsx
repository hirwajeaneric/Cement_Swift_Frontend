import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const PurchaseDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [delivery, setDelivery] = useState({});

  const fetchOrderItems = (orderId, userId) => {
    axios.get(`${serverAddress}/api/v1/cement-swift/cart/findByOrderId?customerId=${userId}&orderId=${orderId}`)
      .then((response) => {
        if (response.status === 200) {
          setOrderItems(response.data.items);
        }
      })
      .catch((error) => {
        console.log('Error :', error.message);
      });
  }

  useEffect(() => {
    var userId = JSON.parse(localStorage.getItem('user'))._id;
    const fetchOrderInformation = (userId) => {
      axios.get(`${serverAddress}/api/v1/cement-swift/order/findById?id=${params.purchaseId}`)
        .then((response) => {
          if (response.status === 200) {
            setOrder(response.data.order);
            setDelivery(response.data.order.delivery);
            fetchOrderItems(response.data.order._id, userId);
          }
        })
        .catch((error) => {
          console.log('Error :', error.message);
        });
    }
    
    fetchOrderInformation(userId);
  },[params.purchaseId])

  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <h1 className="text-2xl font-semibold">Purchase {params.orderId}</h1>
      <div className="list_of_orders flex flex-col border-1 border-gray-400 w-full gap-5">
        <p>Id: {order._id}</p>
        <p>Ordered on: {new Date(order.createdAt).toDateString()}</p>
        <strong>Total: {order.totalPrice}</strong>
        <p>{delivery.deliveryDate}</p>
        
        {/* List of ordered items  */}
        <div className="order_items flex flex-col gap-5 justify-start">
          {orderItems.map((orderItem, index) => (
            <div key={index} className="flex items-center">
            <img src={`${orderItem.photo}`} className="w-12 h-12 object-contain rounded-full" alt="" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{orderItem.productName}</h3>
              <p className="mt-1 text-sm text-gray-500">Quantity: {orderItem.quantity}</p>
              <p className="mt-1 text-sm text-gray-500">{orderItem.total} Rwf</p>
            </div>
          </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default PurchaseDetails