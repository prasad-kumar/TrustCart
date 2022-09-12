import React, { useEffect, useState } from "react";
import "../cart/Cart.css";
import "./newProduct.css";
import Loader from "../layout/loader/Loader";
import Meta from "../layout/Meta";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { Link, useParams } from "react-router-dom";
import { MdOutlineAccountTree } from "react-icons/md";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState();

  const orderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

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

    if (updateError) {
      toast.error(updateError, {
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

    if (isUpdated) {
      toast.success("Order Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch({ type: UPDATE_ORDERS_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, updateError, id, isUpdated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title={`Order Details`} />
          <section className="section">
            <div className="container grid cart-grid">
              <div className="cart-items">
                <div className="shipping-address">
                  <h2 className="cart-heading">Shipping Info</h2>
                  <p>Order Id : #{order._id}</p>
                  {order.user && <p>{order.user.name}</p>}
                  {order.shippingInfo && (
                    <p>
                      {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                      {order.shippingInfo.state}, {order.shippingInfo.country},{" "}
                      {order.shippingInfo.pincode}
                    </p>
                  )}
                  {order.shippingInfo && <p>{order.shippingInfo.phoneNo}</p>}
                </div>
                <br />
                <div className="shipping-address">
                  <h2 className="cart-heading">Payment Info</h2>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "Paid"
                      : "Not Paid"}
                  </p>
                </div>
                <br />
                <div className="shipping-address">
                  <h2 className="cart-heading">Order Status</h2>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
                <br />
                <h2 className="cart-heading">Ordered Items</h2>
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div className="cart-item" key={item._id}>
                      <img src={item.product.images[0].url} alt="cart" />
                      <div className="cart-item-info">
                        <Link to={`/product/${item.product._id}`}>
                          <h4>{item.name}</h4>
                        </Link>
                        <p>
                          {item.quantity} x Rs {item.price} = Rs &nbsp;
                          {item.quantity * item.price}
                        </p>
                        <span className="size">Size : {item.size}</span>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="summary">
                <h2>Summary</h2>
                <div className="price-info">
                  <p>Sub Total</p>
                  <p>Rs {order.totalPrice}</p>
                </div>
                <div className="price-info">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="price-info">
                  <p>Total</p>
                  <p>Rs {order.totalPrice}</p>
                </div>
                <div
                  style={{
                    display:
                    order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                  >
                  <h2>Process Order</h2>
                  
                  <form method="POST" onSubmit={orderSubmitHandler}>
                    <div className="process-form-input">
                      <MdOutlineAccountTree />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose SubCategory</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Process Order
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProcessOrder;
