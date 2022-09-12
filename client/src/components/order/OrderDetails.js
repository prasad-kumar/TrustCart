import React, { useEffect, useState } from "react";
import "../cart/Cart.css";
import Loader from "../layout/loader/Loader";
import Meta from "../layout/Meta";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { newReview } from "../../actions/productAction";
import { AiTwotoneStar } from "react-icons/ai";


const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productId, setProductId] = useState();

  const submitReviewToggle = (id) => {
    open ? setOpen(false) : setOpen(true);
    setProductId(id);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", productId);

    dispatch(newReview(myForm));

    setOpen(false);
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

    if (reviewError) {
      toast.error(reviewError, {
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

    if (success) {
      toast.success("Review Submitted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, reviewError, success]);
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
                    {order.orderStatus &&
                      order.orderStatus}
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
                        <p className="review-btn" onClick={() => submitReviewToggle(item.product._id)} > <AiTwotoneStar/> Rate & Review Product </p>
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
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submitDialog">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />

                    <textarea
                      className="submitDialogTextArea"
                      cols="40"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default OrderDetails;
