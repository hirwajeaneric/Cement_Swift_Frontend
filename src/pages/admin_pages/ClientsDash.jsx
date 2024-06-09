import { useEffect, useState } from "react";
import UsersTable from "../../components/tables/UsersTable";
import axios from "axios";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const ClientsDash = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${serverAddress}/api/v1/cement-swift/user/clients`)
      .then((response) => {
        if (response.data.clients) {
          response.data.clients.map((client) => {
            client.id = client._id;
            return client;
          });
          
          setData(response.data.clients);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="flex mb-6 justify-between">
        <h1 className="text-2xl font-bold">Sellers</h1>
      </div>
      <UsersTable data={data} />
    </div>
  )
}

export default ClientsDash