import { useEffect, useState } from "react"
import TableContainer from "../../components/TableContainer"
import axios from "axios";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const OrdersDash = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${serverAddress}/api/v1/cement-swift/order/list`)
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
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl ">List of Orders</h1>
      <TableContainer orders={orders}/>
    </div>
  )
}

export default OrdersDash