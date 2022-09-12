import React, {useState ,useEffect} from "react";
import "./loginSignin.css";
import changePassword from "../../images/changePassword.svg";
import { FiUnlock } from "react-icons/fi";
import { clearErrors, resetPassword} from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useParams();

  const { error, loading, success } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token,myForm));
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

    if (success) {
        toast.success("Password Updated Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        navigate('/login')
      }

    
  }, [dispatch, error, navigate, success]);

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
            <form method="POST" onSubmit={resetPasswordSubmit}>
              
              <div className="sign-input flex-center">
                <FiUnlock />
                <input
                  type="password"
                  name="newPassword"
                  required
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                Reset Password
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

export default ResetPassword;
