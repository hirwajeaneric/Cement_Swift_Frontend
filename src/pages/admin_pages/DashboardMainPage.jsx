import { Outlet } from "react-router-dom";
import AdminSideMenuBar from "../../components/AdminSideMenuBar";
import TopNavigation from "../../components/TopNavigation";

const DashboardMainPage = () => {
  return (
    <div className="flex h-screen relative">
    <AdminSideMenuBar />
    <div className="flex flex-col flex-1 w-full md:w-1/6 relative">
      <TopNavigation />
      <div className="flex pt-8 pb-8 pl-6 pr-6 w-full h-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default DashboardMainPage