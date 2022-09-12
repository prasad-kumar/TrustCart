import React, { useEffect } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import Meta from "../layout/Meta";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
import orderSvg from "../../images/order.svg";

const Orders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {orders.length <= 0 ? (
            <section className="section section-empty-cart flex-center">
              <div className="container grid info flex-center">
                <div className="order-img">
                  <img src={orderSvg} alt="order" />
                </div>
                <h4>You have not ordered anything yet</h4>
                <Link to="/products">
                  <span className="btn">Order Now</span>
                </Link>
              </div>
            </section>
          ) : (
            <>
              <Meta title={`My Orders - TrustCart`} />
              <br />
              <br />
              <div className="container bredcrumb">
                <p className="flex-center">
                  Home <MdOutlineNavigateNext /> Profile
                  <MdOutlineNavigateNext /> My Orders
                </p>
              </div>

              <section className="section section-orders">
                <div className="container grid">
                  <h2 className="my-orders-h2">My Orders</h2>
                  {orders &&
                    orders.map((item) => (
                      <Link to={`/order/${item._id}`} key={item._id}>
                        <div className="grid order-info" >
                          <div className="product-info">
                            <img
                              src={item.orderItems[0].product.images[0].url}
                              alt="product"
                            />
                            <p className="flex-center">
                              {item.orderItems[0].name}
                            </p>
                          </div>
                          <p className="flex-center">Rs {item.totalPrice}</p>
                          <p className="flex-center">
                            <span className="green-dot"></span> status :{" "}
                            {item.orderStatus}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
