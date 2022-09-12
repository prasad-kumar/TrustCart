import React, { useState } from "react";
import "./Shipping.css";
import shipping from "../../images/shipping.svg";
import CheckoutSteps from "./CheckoutSteps";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import { MdPublic } from "react-icons/md";
import { MdOutlineLocationCity } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";


const Shipping = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const shippingInfo = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {}

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


  const saveShippingInfoHandler = (e) => {
    e.preventDefault();
    
    if (phoneNo.length < 10 || phoneNo.length > 10){
      toast.error("Phone No Should be 10 Digits", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }

    dispatch(saveShippingInfo({ address, city, state, country, pincode, phoneNo }))
    navigate("/order/confirm")
  }

  return (
    <>
      <section className="section section-shipping">
        <div className="container">
          <CheckoutSteps activeStep={0}/>
          <div className="grid grid-two-col">
            <div className="shipping-img flex-center">
              <img src={shipping} alt="shipping" />
            </div>
            <div className="shipping-page flex-center">
              <h2>Shiping Address</h2>
              <form method="POST" onSubmit={saveShippingInfoHandler}>
                <div className="sign-input flex-center">
                  <FaRegAddressCard />
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Address ( H.No, Area )"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="shipping-input flex-center">
                  <FiPhone />
                  <input
                    type="number"
                    name="phone"
                    required
                    placeholder="Phone no"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <div className="shipping-input flex-center">
                  <MdPublic />
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="null">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {country && (
                  <div className="shipping-input flex-center">
                    <GoLocation />
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {state && (
                  <div className="shipping-input flex-center">
                    <MdOutlineLocationCity />
                    <select
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">City</option>
                      {City &&
                        City.getCitiesOfState(country, state).map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div className="shipping-input flex-center">
                  <BsFillPinMapFill />
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="PINCODE"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>

                <button className="btn" disabled={!state ? true : false} type="submit">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;
