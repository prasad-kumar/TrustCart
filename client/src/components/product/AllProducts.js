import React, { useEffect, useState } from "react";
import "./Product.css";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import Slider from "@mui/material/Slider";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const categories = [
  "T-shirts",
    "Casual Shirts",
    "Formal Shirts",
    "Sweatshirts",
    "Jackets",
    "Blazers & Coats",
    "Sherwanis",
    "Suits",
    "Jeans",
    "Casual Trousers",
    "Formal Trousers",
    "Track Pants & Joggers",
    "Casual Shoes",
    "Sports Shoes",
    "Formal Shoes",
    "Briefs",
    "Vests",
];

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState();
  const [price, setPrice] = useState([0, 25000]);
  const [subCategory, setSubCategory] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const { products, loading, resultsPerPage, error, productCount, filteredProductsCount } =
    useSelector((state) => state.products);

  const { keyword } = useParams();
 
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const count = filteredProductsCount;

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
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

      dispatch(clearErrors);
    }
    dispatch(getProducts(keyword, currentPage, price, subCategory, rating));
  }, [dispatch, error, keyword, currentPage, price, subCategory, rating]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        
        <section className="section-filter">
          <div className="container grid grid-filter">
          
            <div className="filter">
              <div className="filter-section">
                <h2>Category</h2>

                {categories.map((item) => (
                  <label className="custom-check" key={item}>
                    {item}
                    <input
                      type="checkbox"
                      onClick={() => setSubCategory(item)}
                    />
                    <span
                      className="checkmark"
                      onClick={() => setSubCategory(item)}
                    ></span>
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <h2>Price</h2>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={10000}
                />
              
              </div>

              <div className="filter-section">
                <h2>Ratings Above</h2>
                <Slider
                  value={rating}
                  onChange={(e, newRating) => {
                    setRating(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </div>
            </div>
            <section className="section section-products">
              <div className="container grid grid-four-col">
                {products &&
                  products.map((item) => (
                    <Product product={item} key={item._id} />
                  ))}
              </div>
              {resultsPerPage < count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={Number(resultsPerPage)}
                    totalItemsCount={productCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="first"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default AllProducts;
