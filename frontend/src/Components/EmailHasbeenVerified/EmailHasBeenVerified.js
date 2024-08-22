
import "./../EmailHasbeenVerified/EmailHasBeenVerifiedStyle.css";
import ppclogoverified from "./../../Assets/ppc_logo_for_verified.png";
import thumb from "./../../Assets/thumb_for_verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
function EmailHasBeenVerified() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

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

  //   const start_point_email = "/verify-email/";
  //   const end_point_email = "/";

  //   const start_index_email = url_email.indexOf(start_point_email) + start_point_email.length;
  //   const end_index_email = url_email.indexOf(end_point_email, start_index_email);

  //   const sliced_url_email = url_email.substring(start_index_email, end_index_email);

  //   const pattern_email = new RegExp(`${start_point_email}(.*?)${end_point_email}`);
  //   const match_email = url_email.match(pattern_email);
  //   const sliced_url_regex_email = match_email ? match_email[1] : "";

  useEffect(() => {
    getTokenData();
  });
  const getTokenData = () => {
    const href = window.location.href;
    return href;
  };

  const url = getTokenData();
  const start_point = "/verify-email/";
  const end_point = "/";

  const start_index = url.indexOf(start_point) + start_point.length;
  const end_index = url.indexOf(end_point, start_index);

  const sliced_url = url.substring(start_index, end_index);

  const pattern = new RegExp(`${start_point}(.*?)${end_point}`);
  const match = url.match(pattern);
  const sliced_url_regex = match ? match[1] : "";

  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  useEffect(() => {
    resetNewPasswordAction();
  });

  const resetNewPasswordAction = (e) => {
    // e.preventDefault();
    let payload = {
      email: value_mail,
      email_verification_token: sliced_url,
    };
    axios
      .post("/api/verify-email", payload)
      .then((r) => {
        // alert(r.data.data.message);
        setnotificationMessage(r.data.data.message);
        localStorage.removeItem("token");
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
        // navigate("/");
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          setnotificationMessageRed(e.response.data.message);
          setValidationErrors(e.response.data.errors);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };
  return (
    <>    <div>
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
  </div>
    <div className="container-fluid row">
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <div className="ppc_lead_logo_email_verified ">
          <img src={ppclogoverified} className="ppc_logo_style_verified" />
        </div>
        <div className="email_para_div_verified">
          <p className="email_para_verified">Your Email Has Been Verified. </p>
        </div>
        <div className="main_thumb_div">
          <div className="thumb_div_main_verified">
            <img src={thumb} className="thumb_picture_style" />
          </div>
        </div>
        <div>
          <Link to="/">
            <button className="back_to_website_verified_button">
              Back to Website
            </button>
          </Link>
        </div>
      </div>
      <div className="col-lg-4"></div>
    </div>
    </>
  );
}

export default EmailHasBeenVerified;
