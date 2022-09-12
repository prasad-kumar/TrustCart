import React from 'react';
import './Cart.css';
import emptyCart from '../../images/emptyCart.svg';
import { NavLink } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <>
        <section className="section section-empty-cart flex-center">
            <div className="container grid info flex-center">
                <img src={emptyCart} alt="cart" />
                <h4>Your cart is empty!</h4>
                <p>Add items to it now.</p>
                <NavLink to="/products"> <span className='btn'>Shop now</span> </NavLink>
            </div>
        </section>
    </>
  )
}

export default EmptyCart