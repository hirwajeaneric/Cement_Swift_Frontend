import { useEffect, useState } from "react";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const Profile = () => {
  const [message, setMessage] = useState({ title: "", description: "" });
  const [error, setError] = useState({ title: "", description: "" });
  const [user, setUser] = useState({});

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [])

  const updateInfo = (e) => {
    e.preventDefault();
    setError({ title: "", description: '' });
    
    axios.put(`${serverAddress}/api/v1/cement-swift/user/update?id=${user._id}`, user)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setMessage({ title: "Success", description: response.data.message });
          
          setTimeout(() => {
            setError({ title: "", description: '' });
            setMessage({ title: "", description: '' });
          },2000)
        }
      })
      .catch(error => {
        setError({ title: 'Error', description: error.message });
      })
  };

  return (
    <div className="flex flex-col justify-start items-start gap-6">
      <h1 className="text-2xl font-semibold">Personal Information</h1>
      {message.description && <SuccessAlert message={message} />}
      {error.description && <ErrorAlert error={error} />}

      <form onSubmit={updateInfo} className="list_of_orders flex flex-col border-1 border-gray-400 w-full gap-5">
        <div className="col-span-6">
          <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
          <input
            type="email"
            id="Email"
            name="email"
            value={user.email || ''}
            onChange={handleInputs}
            className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>
        <div className="col-span-6">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={user.fullName || ''}
            onChange={handleInputs}
            className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>
        <button type="submit" className="w-full sm:w-1/3 shrink-0 rounded-md border border-slate-950 bg-slate-950 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-slate-600 focus:outline-none focus:ring active:text-slate-500">
          Update Account
        </button>
      </form >
    </div >
  )
}

export default Profile