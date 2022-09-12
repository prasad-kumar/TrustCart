import React, { useEffect } from "react";
import EmptyCart from "./EmptyCart";
import './Cart.css';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteCartItems,
  getCartItems,
  updateCartItems,
} from "../../actions/cartAction";
import { toast } from "react-toastify";
import Loader from "../layout/loader/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, cartItems, cartItemsCount } = useSelector(
    (state) => state.cart
  );


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

      dispatch(clearErrors);
      navigate("/");
    }

    dispatch(getCartItems());
  }, [dispatch, error, navigate]);

  const quantityMinus = (id, quantity) => {
    if (quantity <= 1) {
      return;
    }
    const updatedQuantity = quantity - 1;
    dispatch(updateCartItems(id, updatedQuantity));
  };

  const quantityPlus = (id, quantity, stock) => {
    if (quantity >= stock) {
      return;
    }

    if (quantity >= 5) {
      return;
    }

    const updatedQuantity = quantity + 1;
    dispatch(updateCartItems(id, updatedQuantity));
  };

  const deleteCartItem = (id) => {
    dispatch(deleteCartItems(id));
  };

  let totalPrice = 0;
  console.log(cartItems);
  console.log(cartItemsCount);
  cartItems.forEach((element) => {
    let subtotal = element.price * element.quantity;
    totalPrice += subtotal;
  });

  const checkoutHandler = () => {
    navigate("/checkout")
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {cartItemsCount <= 0 ? (
            <EmptyCart />
          ) : (
            <section className="section">
              <div className="container grid cart-grid">
                <div className="cart-items">
                  <h2 className="cart-heading">My Cart ({cartItemsCount})</h2>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div className="cart-item" key={item._id}>
                        <img src={item.product.images[0].url} alt="cart" />
                        <div className="cart-item-info">
                          <Link to={`/product/${item.product._id}`}>
                            <h4>{item.name}</h4>
                          </Link>
                          <p>
                            Rs {item.price}
                            <span>({item.product.discount}% OFF)</span>
                          </p>
                          <span className="size">Size : {item.size}</span>
                          <div className="quantity">
                            <span
                              className="q-minus flex-center"
                              onClick={() =>
                                quantityMinus(item._id, item.quantity)
                              }
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className="q-value flex-center">
                              {item.quantity}
                            </span>
                            <span
                              className="q-plus flex-center"
                              onClick={() =>
                                quantityPlus(
                                  item._id,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              <AiOutlinePlus />
                            </span>
                          </div>
                        </div>
                        <div className="cart-button">
                          <span
                            className="btn"
                            onClick={() => deleteCartItem(item._id)}
                          >
                            Remove
                          </span>
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
                  <Link to={"/checkout"}>
                    <span className="btn checkout-btn" onClick={checkoutHandler}>Checkout</span>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}
      ;
    </>
  );
};
export default Cart;
