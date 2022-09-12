import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Header = ({ isAuthenticated }) => {
  const toggleMenu = () => {
    const header = document.querySelector(".header");
    header.classList.toggle("active");
  };

  return (
    <header className="header">
      <NavLink to={"/"}>
        <span className="logo">
          <CgShoppingBag className="logo-icon" /> TrustCart
        </span>
      </NavLink>
      <nav className="navbar">
        <ul className="navbar-items">
          <li className="navbar-links men">
            <NavLink to={"/product_category/MEN"}>MEN</NavLink>
          </li>
          <li className="navbar-links">
            <NavLink to={"/product_category/WOMEN"}>WOMEN</NavLink>
          </li>
          <li className="navbar-links">
            <NavLink to={"/product_category/KIDS"}>KIDS</NavLink>
          </li>

          <div className="nav-icons">
            {!isAuthenticated ? (
              <li className="navbar-links">
                <NavLink to={"/login"}>
                  <AiOutlineUser className="icon" />
                </NavLink>
              </li>
            ) : null }
            <li className="navbar-links">
              <NavLink to={"/cart"}>
                <CgShoppingBag className="icon" />
                {/* <span> Cart (10)</span> */}
              </NavLink>
            </li>
            <li className="navbar-links">
              <NavLink to={"/search"}>
                <IoSearchOutline className="icon" />
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>

      <div className="mobile-nav-btn" onClick={() => toggleMenu()}>
        <IoIosMenu className="menu" />
        <IoClose className="close" />
      </div>
    </header>
  );
};

export default Header;
