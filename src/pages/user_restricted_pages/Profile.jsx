import { useEffect, useState } from "react";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const Profile = () => {
  const [message, setMessage] = useState({ title: "", description: "" });
  const [error, setError] = useState({ title: "", description: "" });
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [])

  const updateInfo = (e) => {
    e.preventDefault();
    setError({ title: "", description: '' });
    setLoading(true);

    axios.put(`${serverAddress}/api/v1/cement-swift/user/update?id=${user._id}`, user)
      .then((response) => {
        setLoading(true);
        if (response.status === 200) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.reload();
          setMessage({ title: "Success", description: response.data.message });

          setTimeout(() => {
            setError({ title: "", description: '' });
            setMessage({ title: "", description: '' });
          }, 2000)
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
            disabled
            value={user.email || ''}
            onChange={handleInputs}
            className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>
        <div className="flex justify-between w-full gap-2 flex-wrap">
          <div className="col-span-6 w-full md:w-[31%]">
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
          <div className="col-span-6 w-full md:w-[31%]">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Phone number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={user.phone || ''}
              onChange={handleInputs}
              className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 w-full md:w-[31%]">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">District</label>
            <input
              type="text"
              id="district"
              name="district"
              required
              value={user.district || ''}
              onChange={handleInputs}
              className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
        </div>
        <div className="flex justify-between w-full gap-2 flex-wrap">
          <div className="col-span-6 w-full md:w-[31%]">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              required
              value={user.province || ''}
              onChange={handleInputs}
              className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 w-full md:w-[31%]">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={user.city || ''}
              onChange={handleInputs}
              className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 w-full md:w-[31%]">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Street address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              required
              value={user.streetAddress || ''}
              onChange={handleInputs}
              className="mt-1 w-full p-3 rounded-md border border-slate-950 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-fit shrink-0 rounded-md border border-slate-950 bg-slate-950 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-slate-600 focus:outline-none focus:ring active:text-slate-500">
          {loading ? "Processing..." : "Update Account"}
        </button>
      </form >
    </div >
  )
}

export default Profile