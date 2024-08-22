import React, { useState } from "react";
import design from "./../../Assets/design.PNG";
import ppclogo from "./../../Assets/ppclogo.png";
import "./../ForgotPassword/ForgotStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";

function ForgotPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  const resetLinkAction = (e) => {
    setIsModalOpen(true);
    e.preventDefault();
    let payload = {
      email: email,
    };
    axios
      .post("/api/forgot-password", payload)
      .then((r) => {
        console.log(r.data.data.message, "response of forgot");
        setIsModalOpen(false);
        setnotificationMessage(r.data.data.message);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        setIsModalOpen(false);
        if (e.response.data.errors != undefined) {
          setIsModalOpen(false);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
          setValidationErrors(e.response.data.errors);
        }
      });
  };

  return (
    <>
      <>
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
      <>
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <>
        <div className="row justify-content-between mainnavbardiv">
          <div className="col p-0">
            <Link to="/">
              <a>
                <img src={ppclogo} className="ppc_logo_forgotpassword" alt="" />
              </a>
            </Link>
          </div>
          <div className="col p-0">
            {/* <div className="progress ">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "40%" }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <label className="numberperctage"> Step 2 of 5</label> */}
          </div>
        </div>
      </>
      <div className="mainrole row">
        <div className="col-12 col-md-3 col-lg-3"></div>
        <div className="mt-5 col-12 col-md-6 col-lg-6">
          <p className="getverficationcode">
            Kindly Enter your Email & We will send you a reset link
          </p>
          <p className="projectrolepara">Forget your Password?</p>
          <form onSubmit={(e) => resetLinkAction(e)}>
            <div className="form-group">
              <input
                required
                type="email"
                id="email"
                name="email"
                className="mt-3 form-control inputemailStyle"
                placeholder="E-mail"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="mt-5 sendcodebutton ">
              Reset Password
            </button>
            <div className="iknowmypassword">
              <Link to="/signin">
                <font color="red">
                  <u>I know my password</u>
                </font>
              </Link>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-6 col-lg-3 maindesign_third p-0">
          <img className="thirddivdesignforemailverification" src={design} />
        </div>
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

export default ForgotPassword;
