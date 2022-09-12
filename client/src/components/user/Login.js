import React, { useEffect, useState } from "react";
import "./loginSignin.css";
import loginSvg from "../../images/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { FiUnlock } from "react-icons/fi";
import { toast } from "react-toastify";
import { clearErrors, login } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/loader/Loader';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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

    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="section section-sign flex-center">
            <div className="container grid grid-two-col">
              <div className="sign-img flex-center">
                <img src={loginSvg} alt="login" />
              </div>
              <div className="sign-page flex-center">
                <h2>Login</h2>
                <form method="POST" onSubmit={loginSubmit}>
                  <div className="sign-input flex-center">
                    <IoMailOutline />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="sign-input flex-center">
                    <FiUnlock />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Link to={"/password/forgot"}>forgot password ?</Link>
                  <button className="btn" type="submit">
                    Login
                  </button>
                </form>
                <span>
                  New to TrustCart ? &nbsp; <Link to={"/signin"}> Sign In</Link>
                </span>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Login;
