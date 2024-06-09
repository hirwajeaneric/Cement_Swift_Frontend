/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const OrderDetailsDash = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState({});
  const [delivery, setDelivery] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    axios.get(`${serverAddress}/api/v1/cement-swift/order/findById?id=${params.orderId}`)
      .then((response) => {
        if (response.data.order) {
          setCustomer(response.data.order.customer);
          setDelivery(response.data.order.delivery);
          setData(response.data.order);
          if (response.data.order.customer) {
            axios.get(`${serverAddress}/api/v1/cement-swift/cart/findByOrderId?customerId=${response.data.order.customerId}&orderId=${params.orderId}`)
              .then((response) => {
                if (response.data.items) {
                  console.log(response.data.items);
                  setOrderProducts(response.data.items);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, [data.customerId, params]);

  return (
    <div className="w-full">
      <div className="flex mb-6 justify-between">
        <h1 className="text-2xl font-bold">Order No {data._id}</h1>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col gap-2 w-full md:w-[49%] rounded-md bg-slate-100 p-5">
          <h3 className="text-lg font-bold">Order</h3>
          <div className="flex flex-col justify-start items-start gap-1">
            <ListItem title={'Status'} value={data.status && data.status.toUpperCase()} position={"odd"} />
            <ListItem title={'Paid amount'} value={`${data.totalPrice} Rwf`} position={"even"} />
            <ListItem title={'Order paid on'} value={`${new Date(data.paidOn).toUTCString()}`} position={"odd"} />
          </div>
          <h3 className="text-lg font-bold mt-4">Client</h3>
          <div className="flex flex-col justify-start items-start gap-1">
            <ListItem title={'Name'} value={customer.fullName} position={"odd"} />
            <ListItem title={'Email'} value={customer.email} position={"even"} />
            <ListItem title={'Phone'} value={customer.phone} position={"odd"} />
            <ListItem title={'City'} value={delivery.city} position={"even"} />
            <ListItem title={'Province'} value={delivery.province} position={"odd"} />
            <ListItem title={'District'} value={delivery.district} position={"even"} />
            <ListItem title={'Street address'} value={delivery.streetAddress} position={"odd"} />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[49%] rounded-md bg-slate-100 p-5">
          <h3 className="text-lg font-bold">Products</h3>
          {orderProducts.length > 0 && orderProducts.map((product) => (
            <OrderProduct key={product._id} item={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsDash

const ListItem = ({ title, value, position }) => {
  return (
    <div className={`flex w-full justify-between bg-${position === "even" && "white"} rounded-md p-2 text-sm`}>
      <p className="w-1/2">{title}</p>
      <p className="w-1/2">{value}</p>
    </div>
  )
}

const OrderProduct = ({ item }) => {
  return (
    <div className="flex gap-2 w-full md:w-full rounded-md bg-slate-100 p-5">
      <img src={`${item.photo}`} className="w-16" alt="" />
      <div className="flex flex-col w-full justify-start items-start gap-1">
        <ListItem title={'Item Name'} value={item.productName} position={"odd"} />
        <ListItem title={'Quantity'} value={item.quantity} position={"even"} />
      </div>
    </div>
  )
}