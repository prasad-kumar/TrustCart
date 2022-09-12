import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import hero from "../../images/shopping.svg";
import ProductItem from "./ProductItem";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import {toast} from 'react-toastify';
import Meta from '../layout/Meta';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error){
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

        dispatch(clearErrors)
    }

    dispatch(getProducts());
    
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title={`Online Shopping for Women, Men, Kids Fashion & Lifestyle - TrustCart`} />
          <section className="section section-hero">
            <div className="container grid grid-two-col">
              <div className="hero-info flex-center">
                <p>Exclusive Sales</p>
                <h1>UP TO 50% OFF ON SALES</h1>
                <p>Get all exclusive offers for the season</p>
                <Link to={"/products"}>
                  <span className="btn hero-btn">View Collections</span>
                </Link>
              </div>
              <div className="hero-img flex-center">
                <img src={hero} alt="hero" />
              </div>
            </div>
          </section>
          <section className="section conatainer section-products">
            <h2>Recommended Products</h2>
          </section>
          <section className="section section-products">
            <div className="container grid grid-four-col">
              {products &&
                products.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
