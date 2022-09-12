import React, {useState ,useEffect} from "react";
import "./loginSignin.css";
import changePassword from "../../images/changePassword.svg";
import { FiUnlock } from "react-icons/fi";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";


const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
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

    if (isUpdated) {
      toast.success("Password Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/profile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  return (
    <>
    {loading ? (
      <Loader />
    ): (
      <>
      <section className="section section-sign flex-center">
        <div className="container grid grid-two-col">
          <div className="sign-img flex-center">
            <img src={changePassword} alt="signin" />
          </div>
          <div className="sign-page flex-center">
            <h2>Change Password</h2>
            <form method="POST" onSubmit={updatePasswordSubmit}>
              <div className="sign-input flex-center">
                <FiUnlock />
                <input
                  type="password"
                  name="oldPassword"
                  required
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="sign-input flex-center">
                <FiUnlock />
                <input
                  type="password"
                  name="newPassword"
                  required
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="sign-input flex-center">
                <FiUnlock />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="btn" type="submit">
                Change Password
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

export default ChangePassword;
