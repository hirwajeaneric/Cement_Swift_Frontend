import { Link, NavLink } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navigation = () => {
  return (
    <nav className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-screen-xl text-black justify-between items-center px-4 py-7 sm:px-6 lg:px-8 lg:pt-7">
        <Link to={'/'} className="text-3xl font-extrabold">Cement Swift</Link>
        <div className="flex gap-8 items-center">
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/products'}>Shop</NavLink>
          {localStorage.getItem('user') && 
            <NavLink to={'/account'}>My Profile</NavLink>
          }
          {!localStorage.getItem('user') && <NavLink to={'/signin'} className="text-white bg-black px-5 py-3 rounded-lg">Login</NavLink>}
          {localStorage.getItem('user') && 
            <NavLink to={'/cart'} className="text-black">
              <MdOutlineShoppingCart className="text-2xl"/>
            </NavLink>}
        </div>
      </div>
    </nav>
  )
}

export default Navigation