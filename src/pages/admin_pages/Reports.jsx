import { useEffect, useState } from "react"
import FilterOptions from "../../components/FilterOptions"
import { BiCalendarEdit } from "react-icons/bi"
import axios from "axios"
import PdfCard from "../../components/reports/PdfCard"
import { getAllRequestedProducts } from "../../api/cart"
import { getMonthlyProductData } from "../../utils/getMonthlyProductData"
import { productTypes } from "../../utils/ProductData"

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const Reports = () => {
  const [stats, setStats] = useState([]);
  const [monthlyProductData, setMonthlyProductData] = useState({}); 
  const [reportPeriod, setReportPeriod] = useState('Month');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
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

          // Data for all requested product types and their statistics
          getAllRequestedProducts()
            .then(items => {
              setMonthlyProductData(getMonthlyProductData(items, productTypes));
            })
            .catch(err => console.log(err));


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

          // setShippedStats([orders.length, deliveredOrders.length]);
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
      <div>
        <div className="flex mb-6 justify-between">
          <h1 className="text-2xl font-bold">Reports</h1>
        </div>
        <div className="flex gap-2 items-start">
          <PdfCard
            title="Orders report"
            reportPeriod={reportPeriod}
            stats={stats}
            monthlyProductData={monthlyProductData}
          />
        </div>
      </div>
    </div>
  )
}

export default Reports