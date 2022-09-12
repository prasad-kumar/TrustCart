import React, { useState } from "react";
import "./loginSignin.css";
import forgotPasswordSvg from "../../images/forgotPassword.svg";
import { IoMailOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layout/loader/Loader";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useEffect } from "react";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
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
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="section section-sign flex-center">
            <div className="container grid grid-two-col">
              <div className="sign-img flex-center">
                <img src={forgotPasswordSvg} alt="signin" />
              </div>
              <div className="sign-page flex-center">
                <h2>Forgot Password</h2>
                <form method="POST" onSubmit={updateProfileSubmit}>
                  <div className="sign-input flex-center">
                    <IoMailOutline />
                    <input
                      type="mail"
                      name="mail"
                      required
                      placeholder="Enter Your Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button className="btn" type="submit">
                    Send Mail
                  </button>
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
