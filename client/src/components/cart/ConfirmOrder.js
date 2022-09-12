import React from "react";
import '../cart/Cart.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { cartItems, cartItemsCount } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.user);

  const shippingInfo = localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {};
    
  const address = `${shippingInfo.address},  ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pincode}`;

  let totalPrice = 0;

  cartItems.forEach((element) => {
    let subtotal = element.price * element.quantity;
    totalPrice += subtotal;
  });

  let shippingCharges = 0;

  const proceedToPayment = () => {
    const data = {
      subtotal: totalPrice,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <CheckoutSteps activeStep={1} />
      <section className="section">
        <div className="container grid cart-grid">
          <div className="cart-items">
            <div className="shipping-address">
              <h2 className="cart-heading">Shipping Info</h2>
              <p>{user.name}</p>
              <p>{address}</p>
              <p>{shippingInfo.phoneNo}</p>
            </div>
            <br />
            <br />
            <h2 className="cart-heading">My Cart Items: ({cartItemsCount})</h2>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img src={item.product.images[0].url} alt="cart" />
                  <div className="cart-item-info">
                    <Link to={`/product/${item.product._id}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <p>
                      {item.quantity} x Rs {item.price} = Rs{" "}
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
              <p>Rs {totalPrice}</p>
            </div>
            <div className="price-info">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="price-info">
              <p>Total</p>
              <p>Rs {totalPrice}</p>
            </div>
            <button className="btn checkout-btn" onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmOrder;
