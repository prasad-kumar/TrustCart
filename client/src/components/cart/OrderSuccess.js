import React from "react";
import { Link } from "react-router-dom";
import orderConfirmSvg from "../../images/orderConfirm.svg";
import "./OrderSuccess.css";


const OrderSuccess = () => {

  return (
    <>
      <section className="section section-empty-cart flex-center">
        <div className="container grid info flex-center">
          <div className="order-img">
            <img src={orderConfirmSvg} alt="order" />
          </div>
          <h4>Your order has been placed successfully</h4>
          <Link to="/orders/me">
            <span className="btn">View Orders</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
