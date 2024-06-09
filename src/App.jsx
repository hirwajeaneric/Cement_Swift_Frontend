import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Home from "./pages/public_pages/Home";
import Checkout from "./pages/user_restricted_pages/Checkout";
import Cart from "./pages/user_restricted_pages/Cart";
import MainUserPage from "./pages/public_pages/MainUserPage";
import Products from "./pages/public_pages/Products";
import ProductDetails from "./pages/public_pages/ProductDetails";
import SignIn from "./pages/public_pages/SignIn";
import SignUp from "./pages/public_pages/SignUp";
import ResetPassword from "./pages/public_pages/ResetPassword";
import ForgotPassword from "./pages/public_pages/ForgotPassword";
import UserPages from "./pages/user_restricted_pages/UserPages";
import Orders from "./pages/user_restricted_pages/Orders";
import Profile from "./pages/user_restricted_pages/Profile";
import DashboardMainPage from "./pages/admin_pages/DashboardMainPage";
import OrderDetails from "./pages/user_restricted_pages/OrderDetails";
import DashBoardHome from "./pages/admin_pages/DashBoardHome";
import OrderDetailsDash from "./pages/admin_pages/OrderDetailsDash";
import OrdersDash from "./pages/admin_pages/OrdersDash";
import ClientsDash from "./pages/admin_pages/ClientsDash";
import ProfileDash from "./pages/admin_pages/ProfileDash";
import SignInAdmin from "./pages/admin_pages/authentication/SignInAdmin";
import SignUpAdmin from "./pages/admin_pages/authentication/SignUpAdmin";
import ResetPasswordAdmin from "./pages/admin_pages/authentication/ResetPasswordAdmin";
import ForgotPasswordAdmin from "./pages/admin_pages/authentication/ForgotPasswordAdmin";
import Purchases from "./pages/user_restricted_pages/Purchases";
import Success from "./pages/user_restricted_pages/Success";
import CheckoutForm from "./components/CheckoutForm";
import PurchaseDetails from "./pages/user_restricted_pages/PurchaseDetails";
import Reports from "./pages/admin_pages/Reports";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainUserPage />}>
            {/* Public pages  */}
            <Route path="" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="cart" element={<Cart />} />
            <Route path="" element={<Checkout />}>
              <Route path="checkout" element={<CheckoutForm />} />
            </Route>
            <Route path="success" element={<Success />} />

            {/* User-specific and restricted pages  */}
            <Route path="account" element={localStorage.getItem('user') ? <UserPages /> : <Navigate replace to={'/signin'} />}>
              <Route path="" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
              <Route path="purchases" element={<Purchases />} />
              <Route path="purchase/:purchaseId" element={<PurchaseDetails />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order/:orderId" element={<OrderDetails />} />
            </Route>
          </Route>

          {/* Client authentication pages  */}
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          {/* Dashboard Authenticaiton  */}
          <Route path="/admin/signin" element={<SignInAdmin />} />
          <Route path="/admin/signup" element={<SignUpAdmin />} />
          <Route path="/admin/reset-password" element={<ResetPasswordAdmin />} />
          <Route path="/admin/forgot-password" element={<ForgotPasswordAdmin />} />

          {/* Dashboard Pages  */}
          <Route path="/dashboard" element={localStorage.getItem('admin_token') ? <DashboardMainPage /> : <Navigate replace to={'/admin/signin'} />}>
            <Route path="" element={<DashBoardHome />} />
            <Route path="reports" element={<Reports />} />
            <Route path="clients" element={<ClientsDash />} />
            <Route path="orders" element={<OrdersDash />} />
            <Route path="order/:orderId" element={<OrderDetailsDash />} />
            <Route path="profile" element={<ProfileDash />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;