import React, { useEffect, useState } from "react";
import "./loginSignin.css";
import signinSvg from "../../images/signin.svg";
import { Link, useNavigate } from "react-router-dom";
import { RiUser6Line } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import { FiUnlock } from "react-icons/fi";
import { toast } from "react-toastify";
import { clearErrors, register } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";

const Signin = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const {name, email, password} = user;

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
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
                <img src={signinSvg} alt="signin" />
              </div>
              <div className="sign-page flex-center">
                <h2>Signin</h2>
                <form
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  <div className="sign-input flex-center">
                    <RiUser6Line />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name"
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="sign-input flex-center">
                    <IoMailOutline />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="sign-input flex-center">
                    <FiUnlock />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      onChange={registerDataChange}
                    />
                  </div>
                  <div id="registerImage" className="flex-center">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                      required
                    />
                  </div>
                  <button className="btn" type="submit">
                    Signin
                  </button>
                </form>
                <span>
                  Already registered user ? &nbsp;
                  <Link to={"/login"}> Login </Link>
                </span>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Signin;
