import { useEffect, useState } from "react"
import FilterOptions from "../../components/FilterOptions"
import OverviewCards from "../../components/OverviewCards"
import { LineChart } from "../../components/chart/LineChart"
import { PieChart } from "../../components/chart/PieChart"
import { BiCalendarEdit } from "react-icons/bi"
import axios from "axios"
import { getAllRequestedProducts } from "../../api/cart"
import { getMonthlyProductData } from "../../utils/getMonthlyProductData"
import { productTypes } from "../../utils/ProductData"
import { MultiLineChart } from "../../components/chart/MultiLineChart"

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const DashBoardHome = () => {
  const [stats, setStats] = useState([]);
  const [shippedStats, setShippedStats] = useState([]);
  const [reportPeriod, setReportPeriod] = useState('Month');
  const [customers, setCustomers] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [monthlyProductData, setMonthlyProductData] = useState({});

  // Function to generate monthly order statistics
  const generateMonthlyOrderStats = (orders) => {
    const monthlyOrderCounts = Array(12).fill(0);
    orders.forEach(order => {
      const month = new Date(order.createdAt).getMonth();
      monthlyOrderCounts[month]++;
    });
    return monthlyOrderCounts;
  }

  useEffect(() => {
    // Fetching cart items
    getAllRequestedProducts()
    .then(items => {
      setMonthlyProductData(getMonthlyProductData(items, productTypes));
    })
    .catch(err => console.log(err));
    
    // Fetching orders 
    axios.get(`${serverAddress}/api/v1/cement-swift/order/list`)
      .then((response) => {
        if (response.status === 200) {
          var orders = [];
          // Filtering by report period 
          if (reportPeriod === 'Month') {
            orders = response.data.orders.filter((order) => {
              var date = new Date(order.createdAt);
              return date.getMonth() === new Date().getMonth();
            });
          } else if (reportPeriod === 'Year') {
            orders = response.data.orders.filter((order) => {
              var date = new Date(order.createdAt);
              return date.getFullYear() === new Date().getFullYear();
            });
          }

          // Set monthly order statistics
          setMonthlyOrders(generateMonthlyOrderStats(response.data.orders));

          // Fetching clients 
          axios.get(`${serverAddress}/api/v1/cement-swift/user/clients`)
            .then((response) => {
              if (response.data.clients) {
                var clients = [];
                if (reportPeriod === 'Month') {
                  clients = response.data.clients.filter((client) => {
                    var date = new Date(client.createdAt);
                    return date.getMonth() === new Date().getMonth();
                  });
                } else if (reportPeriod === 'Year') {
                  clients = response.data.clients.filter((client) => {
                    var date = new Date(client.createdAt);
                    return date.getFullYear() === new Date().getFullYear();
                  });
                }
                setCustomers(clients);
              }
            })
            .catch((error) => {
              console.log(error);
            });

          // Filtering by status
          var deliveredOrders = orders.filter((order) => order.status === 'shipped');
          var confirmedOrders = orders.filter((order) => order.status === 'confirmed');

          setShippedStats([orders.length, deliveredOrders.length]);
          setStats([
            {
              title: "Total Orders",
              value: orders.length,
            },
            {
              title: "Total Confirmed",
              value: confirmedOrders.length,
            },
            {
              title: "Total Deliveries",
              value: deliveredOrders.length,
            },
            {
              title: "Total Customers",
              value: customers.length,
            }
          ]);
        }
      })
      .catch((error) => {
        console.log('Error :', error.message);
      });
  }, [customers.length, reportPeriod]);


  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex justify-between">
        <FilterOptions reportPeriod={reportPeriod} setReportPeriod={setReportPeriod} />

        <span className="flex items-center gap-2">
          <BiCalendarEdit className="font-bold text-xl" />
          {new Date().toDateString()}
        </span>
      </div>
      <OverviewCards reportPeriod={reportPeriod} stats={stats} />
      <div className="flex w-full justify-between items-start flex-wrap mt-6">
        <div className="w-full md:w-[66%] rounded-md border border-gray-300 p-4">
          <h2 className="text-sm font-bold mb-2">All recieved orders in this year</h2>
          <LineChart monthlyOrders={monthlyOrders} />
        </div>
        <div className="w-full md:w-[32%] rounded-md border border-gray-300 p-4">
          <h2 className="text-sm font-bold mb-2">Shipped cement vs Ordered cement</h2>
          <PieChart data={shippedStats} />
        </div>
      </div>
      <div className="flex w-full justify-between items-start flex-wrap mt-6">
        <div className="w-full rounded-md border border-gray-300 p-4 mb-20">
          <h2 className="text-sm font-bold mb-2">Requested cement types for each month</h2>
          <MultiLineChart monthlyProductData={monthlyProductData} />
        </div>
      </div>
    </div>
  )
}

export default DashBoardHome