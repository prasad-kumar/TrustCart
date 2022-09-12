import React, { useEffect } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";


const Profile = () => {

  const {user, loading, isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated === false){
        navigate("/login");
    }
  },[navigate, isAuthenticated])
  
  return (
    <>
      {loading ? (
        <Loader />
      ):(
        <>
        <section className="section section-profile">
          <div className="container grid profile-card">
            <div className="profile-pic flex-center">
              <img src={user.avatar.url} alt="profile" />
            </div>
            <div className="profile-info">
              <div className="profile-div">
                <p>Full Name </p>
                <h4>{user.name}</h4>
              </div>
              <div className="profile-div">
                <p>Email</p>
                <h4>{user.email}</h4>
              </div>
              <div className="profile-div">
                <p> Joined On</p>
                <h4>{String(user.createdAt).substring(0, 10)}</h4>
              </div>
              <div className="profile-links">
                <div>
                  <Link to={"/profile/update"}>
                    <span className="btn">Edit Profile</span>
                  </Link>
                </div>
                <div>
                  <Link to={"/profile/password/change"}>
                    <span className="btn">Change Password</span>
                  </Link>
                </div>
                <div>
                  <Link to={"/orders/me"}>
                    <span className="btn">View Orders</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      )}
    </>
  );
};

export default Profile;
