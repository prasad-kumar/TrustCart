import React, { useState } from "react";
import "./Search.css";
import Meta from "../layout/Meta";
import { useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <Meta title={`Search for products, brands and more - TrustCart`} />
      <br />
      <br />
      <div className="container bredcrumb">
        <p className="flex-center">
          Home <MdOutlineNavigateNext/> Search
        </p>
      </div>
      <section className="section section-search flex-center">
        <div className="container grid">
          <form onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Search;
