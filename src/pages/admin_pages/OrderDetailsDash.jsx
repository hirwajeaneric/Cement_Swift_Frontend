/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const OrderDetailsDash = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [customer, setCustomer] = useState({});
  const [delivery, setDelivery] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const updateOrder = (e) => {
    e.preventDefault();
    setLoading(true);

    data.delivery.deliveryDate = delivery.deliveryDate;
    // console.log(data);

    axios.put(`${serverAddress}/api/v1/cement-swift/order/update?id=${params.orderId}`, data)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log('Error :', error.message);
      });
  }

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
            {delivery.deliveryDate && <ListItem title={'Delivery date'} value={`${new Date(delivery.deliveryDate).toUTCString()}`} position={"odd"} />}
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

        <form onSubmit={updateOrder} className="flex mt-2 flex-col w-full gap-2">
          <h2 className="text-lg font-bold">Order updates</h2>
          <div className="flex justify-start w-full gap-2 flex-wrap">
            <div className="col-span-6 w-full md:w-[31%]">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-500">Confirm delivery date</label>
              <input
                type="date"
                id="deliveryDate"
                name="fullName"
                required
                value={delivery.deliveryDate || ''}
                onChange={(e) => setDelivery({ ...delivery, deliveryDate: e.target.value })}
                className="mt-1 w-full p-3 rounded-md border border-slate-400 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="col-span-6 w-full md:w-[31%]">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-500">Change order status</label>
              <select
                type="text"
                id="status"
                name="status"
                required
                onChange={(e) => setData({ ...data, status: e.target.value })}
                className="mt-1 w-full p-3 rounded-md border border-slate-400 bg-white text-sm text-gray-700 shadow-sm"
              >
                <option value="">Choose status</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="received">Received</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="mt-2 mb-10 w-fit bg-black text-white px-3 py-2 hover:bg-slate-600 rounded-md ">
            {loading ? "Processing..." : "Update order"}
          </button>
        </form>
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