import React, { useEffect, useState } from "react";
import "./App.css";
import "./components/product/Product.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import Signin from "./components/user/Signin";
import Login from "./components/user/Login";
import AllProducts from "./components/product/AllProducts";
import ProductCategory from "./components/product/ProductCategory";
import ProductDetails from "./components/product/ProductDetails";
import Search from "./components/product/Search";
import Cart from "./components/cart/Cart";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ChangePassword from "./components/user/ChangePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Orders from "./components/order/Orders";
import OrderDetails from "./components/order/OrderDetails";
import Shipping from "./components/cart/Shipping";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/header/UserOptions";
import ProtectedRoute from "./components/layout/route/ProtectedRoute";
import ResetPassword from "./components/user/ResetPassword";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import OrdersList from "./components/admin/OrdersList";
import ProductReviews from "./components/admin/ProductReviews";
import UsersList from "./components/admin/UsersList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProcessOrder from "./components/admin/ProcessOrder";
import UpdateUser from "./components/admin/UpdateUser";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  const stripePromise = loadStripe(stripeApiKey);

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        <Header isAuthenticated={isAuthenticated} />

        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:keyword" element={<AllProducts />} />
          <Route path="/product_category/:category" element={<ProductCategory />} />
          <Route
            path="/product/:id"
            element={<ProductDetails isAuthenticated={isAuthenticated} user={user}/>}
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/password/change"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Shipping />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />

          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              }
            />
          )}

          <Route
            path="/success"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/me"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <ProductList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/product/new"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <NewProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <OrdersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <UpdateUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} user={user} >
                <ProductReviews />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={window.location.pathname === "/process/payment" ? null : <NotFound />} />

        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
