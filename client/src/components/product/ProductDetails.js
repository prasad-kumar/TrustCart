import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Meta from "../layout/Meta";
import { MdOutlineNavigateNext } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import noReview from "../../images/noReview.svg";
import { clearMessage, createCartItems } from "../../actions/cartAction";
import { MdModeEdit } from "react-icons/md";

const ProductDetails = ({user, isAuthenticated}) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
  const [stock, setStock] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => 
      state.productDetails
  );
  const error1 = useSelector((state) => state.cart.error);
  const message = useSelector((state) => state.cart.message);

  const { id } = useParams();

  const saveSize = (size, stock) => {
    setSize(size);
    setStock(stock);
    const productSizes = document.querySelectorAll(`.product-size`);
    const productSize = document.querySelector(`.size-${size}`);
    productSizes.forEach((item) => {
      item.classList.remove("active-size");
    });
    productSize.classList.add("active-size");

    const sizeError = document.querySelector(`.size-error`);
    sizeError.style.display= "none";
  };

  const selectSizeError = () => {
    const sizeError = document.querySelector(`.size-error`);
    sizeError.style.display= "block";
  }

  const addToCartHandler = () => {
    const cartData = {
      name:product.name,
      price:product.sellingPrice,
      size:size,
      stock:stock,
      quantity:1,
      product:product._id
    }

    dispatch(createCartItems(cartData));

  }

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
    }

    if (error1) {
      toast.error(error1, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      dispatch(clearErrors);
    }

    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      dispatch(clearMessage);
      
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, error1, message]);

  

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Meta title={`${product.name} - TrustCart`} />
          <br />
          <br />
          <div className="container bredcrumb">
            <p className="flex-center">
              Home <MdOutlineNavigateNext /> {product.category}
              <MdOutlineNavigateNext /> {product.subCategory}
              <MdOutlineNavigateNext /> {product.name}
            </p>
          </div>
          <section className="section section-product-details">
            <div className="container product-flex">
              <div className="product-carousel">
                <div className="div">
                  <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>
              </div>
              <div className="product-details">
                <h2>{product.brand}</h2>
                <p>{product.name}</p>
                <span>
                  {product.rating} &nbsp;
                  <AiTwotoneStar /> &nbsp; | &nbsp; {product.numOfReviews}
                  &nbsp; Ratings
                </span>
                <hr />
                <div className="prices">
                  <h3>Rs {product.sellingPrice}</h3>
                  <p>
                    <strike>Rs {product.retailPrice}</strike>
                  </p>
                  <p className="discount">({product.discount}% OFF)</p>
                </div>
                <h6 className="tax-info">inclusive of all taxes</h6>
                <h4>SELECT SIZE</h4>
                <div className="size-error">Please select a size</div>
                <div className="product-sizes">
                  {product.productSize &&
                    product.productSize.map((item) =>
                      item.quantity > 0 ? (
                        <div
                          className={`flex-center size-${item.productSize} product-size`}
                          onClick={() =>
                            saveSize(item.productSize, item.quantity)
                          }
                          key={item._id}
                        >
                          {item.productSize}
                        </div>
                      ) : (
                        <div className="flex-center product-size-disable">
                          {item.productSize}
                        </div>
                      )
                    )}
                </div>

                
                  <button className="btn" onClick={!size ? selectSizeError : addToCartHandler}>
                    Add to cart
                  </button>
                <h4 className="product-h4">Product Details</h4>
                <p className="product-description">{product.productDetails}</p>
              </div>
            </div>
          </section>
          <section className="section">
            <h2 className="container reviews-heading">Reviews</h2>
            <div className="container reviews">
              {product.reviews && product.reviews[0] ? (
                product.reviews.map((item) => (
                  <div className="review-card">
                    <div className="review-profile">
                      <img src={item.user.avatar.url} alt="avatar" />
                      <div className="review-profile-info">
                        <p>{item.name}</p>
                        <p>
                          {item.rating}&nbsp;
                          <AiTwotoneStar />
                          {/* {item.user._id === user._id && (<MdModeEdit />)} */}
                        </p>
                      </div>
                    </div>

                    <span>{item.comment}</span>
                  </div>
                ))
              ) : (
                <div className="no-reviews flex-center">
                  <img src={noReview} alt="noReview" />
                  <p>No Reviewes Yet</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetails;
