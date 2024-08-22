import React, { useEffect, useState } from "react";
import designleftside from "./../../Assets/designleftside.PNG";
import ppclogo from "./../../Assets/ppclogo.png";
import "./../ForgotNewPassword/NewpasswordStyle.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";

function NewPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getEmailData();
  });
  const getEmailData = () => {
    const href = window.location.href;
    return href;
  };

  const url_email = getEmailData();
  function getValueAfterFifthSlash(str) {
    const parts = str.split("/");
    if (parts.length >= 6) {
      return parts[5];
    } else {
      return null; // Return null if there are less than 6 parts
    }
  }
  const value_mail = getValueAfterFifthSlash(url_email);

  useEffect(() => {
    getTokenData();
  }, []);
  const getTokenData = () => {
    const href = window.location.href;
    // const token = href.get('token');
    return href;
  };

  const url = getTokenData();
  const start_point = "/reset-password/";
  const end_point = "/";

  // Using string manipulation
  const start_index = url.indexOf(start_point) + start_point.length;
  const end_index = url.indexOf(end_point, start_index);

  const sliced_url = url.substring(start_index, end_index);

  // Using regular expressions
  const pattern = new RegExp(`${start_point}(.*?)${end_point}`);
  const match = url.match(pattern);
  const sliced_url_regex = match ? match[1] : "";

  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  const resetNewPasswordAction = (e) => {
    setIsModalOpen(true);
    e.preventDefault();
    let payload = {
      email: value_mail,
      token: sliced_url,
      password: password,
      password_confirmation: password_confirmation,
    };
    axios
      .post("/api/reset-password", payload)
      .then((r) => {
        setIsModalOpen(false);
        setnotificationMessage(r.data.data.message);
        setTimeout(() => {
          setnotificationMessage("");
          navigate("/signin");
        }, 4000);
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          setIsModalOpen(false);
          setnotificationMessageRed(e.response.data.message);
          setValidationErrors(e.response.data.errors);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleTogglePassword1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  return (
    <>
      <>
        {" "}
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
      <>
        {" "}
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <>
        <div className="row justify-content-between mainnavbardiv_newpassword">
          <div className="col p-0">
            {/* <Link to="/"> */}
            <a>
              <img src={ppclogo} className="ppc_logo_newpassword" alt="" />
            </a>
            {/* </Link> */}
          </div>
          <div className="col p-0"></div>
        </div>
      </>
      <div className="mainnewpassword row">
        <div className="col-sm-12 col-md-3 col-lg-3 main_design">
          <img className="design_newpassword_style" src={designleftside} />
        </div>
        <div className="mt-5 col-sm-12 col-md-6 col-lg-6">
          <p className="newpasswordenter">Kindly Enter your New Password</p>
          <p className="reset_password">Reset Your Password</p>
          <form onSubmit={(e) => resetNewPasswordAction(e)}>
            <div className="form-group">
              <div className="inputpassworddiv">
                <input
                  required
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  className="mt-3 form-control inputpasswordStyle"
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className="fa fa-eye eye-new-password"
                  onClick={handleTogglePassword}
                ></i>
              </div>
            </div>
            <div className="form-group">
              <div className="inputpassworddiv">
                <input
                  required
                  type={passwordVisible1 ? "text" : "password"}
                  id="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-3 form-control inputpasswordStyle"
                  placeholder="Confirm Password"
                />
                <i
                  className="fa fa-eye eye-new-password"
                  onClick={handleTogglePassword1}
                ></i>
              </div>
            </div>
            <button type="" className="mt-5 resetpasswordbutton ">
              Reset Password
            </button>
          </form>
        </div>
        <div className="col-sm-3 col-md-6 col-lg-3 p-0"></div>
      </div>

      <>
        <div
          class={`modal fade bd-example-modal-sm ${
            isModalOpen ? "show" : ""
          } mt-5`}
          style={{ display: isModalOpen ? "block" : "none" }}
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden={!isModalOpen}
        >
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <SpinnerLoader />
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default NewPassword;
