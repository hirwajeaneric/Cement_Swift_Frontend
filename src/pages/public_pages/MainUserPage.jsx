import { Outlet } from "react-router-dom"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"

const MainUserPage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-start items-center">
        <Navigation />
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainUserPage