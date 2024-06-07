import { Outlet } from "react-router-dom"
import SimpleUserNavigationBar from "../../components/SimpleUserNavigationBar"

const UserPages = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-wrap w-full mb-12 max-w-screen-xl text-black justify-between items-start px-4 py-7 sm:px-6 lg:px-8 lg:pt-7">
        <SimpleUserNavigationBar />
        <div className="w-full md:w-3/4 md:pl-10 mt-10 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserPages