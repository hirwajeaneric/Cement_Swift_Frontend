import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { HiOutlineWallet } from "react-icons/hi2";
import { LuPackage } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

const SimpleUserNavigationBar = () => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.replace('/');
  }

  return (
    <div className="w-full md:w-1/4 flex flex-col gap-6 border-slate-50 p-3 rounded-md border-solid border-2 justify-start items-start">
      <div className="flex gap-2 items-center">
        <FaRegUserCircle className="w-10 h-10 text-gray-700" />
        <div>
          <p className="text-lg font-bold text-gray-700">{JSON.parse(localStorage.getItem('user')).fullName}</p>
          <p className="text-sm text-gray-700">{JSON.parse(localStorage.getItem('user')).email}</p>
        </div>
      </div>
      <Link to={'./profile'} className="flex gap-4 w-full items-center border-slate-100 pt-3 border-solid border-t-2">
        <FaRegUser />
        <p>Personal Information</p>
      </Link>
      <Link to={'./purchases'} className="flex gap-4 items-center">
        <HiOutlineWallet />
        <p>My Purchases</p>
      </Link>
      <Link to={'./orders'} className="flex gap-4 items-center">
        <LuPackage />
        <p>My Orders</p>
      </Link>
      <button onClick={logout} className="flex gap-4 items-center">
        <BiLogOut />
        <p>Logout</p>
      </button>
    </div>
  )
}

export default SimpleUserNavigationBar
