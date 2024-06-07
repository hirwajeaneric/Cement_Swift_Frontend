import { Outlet } from "react-router-dom";
import AdminSideMenuBar from "../../components/AdminSideMenuBar";

const DashboardMainPage = () => {
  return (
    <div className="flex md:h-screen flex-wrap w-full max-w-ful justify-start md:justify-between items-start">
      <AdminSideMenuBar />
      <div className="md:h-screen w-full md:w-4/5 p-5">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardMainPage