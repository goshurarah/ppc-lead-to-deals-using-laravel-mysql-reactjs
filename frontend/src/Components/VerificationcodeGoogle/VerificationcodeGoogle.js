import React, { useState } from "react";
import design from "./../../Assets/design.PNG";
import ppclogo from "./../../Assets/ppclogo.png";
import "./../VerificationcodeGoogle/VerificationcodeGoogleStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";

function VerificationcodeGoogle() {
  useEffect(() => {
    return () => {
      getStorageData();
    };
  });
  const getStorageData = () => {
    const savedItem = localStorage.getItem("email");
    return savedItem;
  };
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const verificationCodeAction = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    let payload = {
      phone: phone,
      email: getStorageData(),
    };
    axios
      .post("/api/send-phone-verification-code", payload)
      .then((r) => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        // localStorage.setItem("token", r.data.token);
        navigate("/enter_code_google");
      })
      .catch((e) => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        if (e.response.data.errors != undefined) {
          setValidationErrors(e.response.data.errors);
          // CustomeMessageShow(e.response.data.message);
        }
      });
  };

  const phonenumberpattern = "/^([0-9s-+()]*)$/";
  return (
    <>
      <>
        <div className="row justify-content-between mainnavbardiv">
          <div className="col p-0">
            <a href="#">
              <img src={ppclogo} className="ppc_logo" />
            </a>
          </div>
          <div className="col p-0">
            <div className="progress ">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "40%" }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <label className="numberperctage"> Step 2 of 7</label>
          </div>
        </div>
      </>
      <div className="mainrole row">
        <div className="col-sm-12 col-md-3 col-lg-3"></div>
        <div className="mt-3 col-sm-12 col-md-6 col-lg-6">
          <p className="getverficationcode">
            Kindly Enter Your Mobile Number To Get Verification Code
          </p>
          <p className="projectrolepara">
            We will send you a verification code
          </p>
          <form onSubmit={(e) => verificationCodeAction(e)}>
            <div className="form-group">
              <input
                required
                type="phone"
                id="phone"
                name="phone"
                className="mt-3 form-control inputephoneStyle"
                placeholder="+01 00 000000"
                pattern={phonenumberpattern}
                title="The phone field format is invalid"
                minLength="10"
                maxLength="20"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              {/* <input
              type="email"
              id="email"
              name="email"
              className="mt-3 form-control inputephoneStyle"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled
              value={getStorageData()}
            /> */}
            </div>

            <button type="submit" className="mt-5 sendcodebutton ">
              Send Code
            </button>
          </form>
        </div>
        <div className="col-sm-3 col-md-6 col-lg-3 third_div_main p-0">
          <img className="third_divdesignforcode" src={design} />
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

export default VerificationcodeGoogle;
