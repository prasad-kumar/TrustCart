import React from 'react'
import './Footer.css';
import { NavLink } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";


const Footer = () => {
  return (
    <>
      <section className='section section-footer'>
          <div className="container grid grid-four-col">
            <div className="extras footer-col">
              <h3>EXTRAS</h3>
              <ul className='footer-items'>
                <li><NavLink to='#' className='footer-link'>Brands</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Gift Certficates</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Affiliate</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Specials</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Blog</NavLink></li>
              </ul>
            </div>
            <div className="info footer-col">
            <h3>INFORMATION</h3>
              <ul >
                <li><NavLink to='#' className='footer-link'>About Us</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Privacy Policy</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Terms & Conditions</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Contact Us</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Sitemap</NavLink></li>
              </ul>
            </div>
            <div className="account footer-col">
            <h3>MY ACCOUNT</h3>
              <ul>
                <li><NavLink to='#' className='footer-link'>My Account</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Order History</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Wishlist</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Newsletter</NavLink></li>
                <li><NavLink to='#' className='footer-link'>Returns</NavLink></li>
              </ul>
            </div>
            <div className="contact footer-col">
            <h3>CONTACT US</h3>
              <ul>
                <li><MdLocationPin /> &nbsp; 42 Dream House, Dreammy street, </li>
                <li>7131 Dreamville, USA</li>
                <li><BsFillTelephoneFill /> &nbsp; <NavLink to='tel:+919876543210' className='footer-link'> +91-9876543210 </NavLink></li>
                <li><HiMail /> &nbsp; <NavLink to='mailto:trustcart@gmail.com' className='footer-link'> trustcart@gmail.com </NavLink></li>
              </ul>
            </div>
          </div>
          <div className="container grid copy-para">
            <p>Copyright ©2022 All rights reserved | This e-commerce website is made with ❤ by Prasad Kumar</p>
          </div>
      </section> 
    </>
  )
}

export default Footer