import React, { useState, useEffect, useRef } from "react";
import design from "./../../Assets/design.PNG";
import ppclogo from "./../../Assets/ppclogo.png";
import "./../EnterverficationCodeGoogle/EnterVerificationCodeGoogle.css";
import designleftside from "./../../Assets/designleftside.PNG";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";

function EnterVerificationCodeGoogle() {
  const [seconds, setSeconds] = useState(120); // set initial time in seconds
  const numberRefs = useRef([]);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  useEffect(() => {
    return () => {
      getStorageData();
    };
  }, []);

  const getStorageData = () => {
    const savedItem = localStorage.getItem("email");
    return savedItem;
  };

  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const updatedCode = [...verificationCode];
      updatedCode[index] = value;
      setVerificationCode(updatedCode);

      if (value && index < 5) {
        numberRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      numberRefs.current[index - 1].focus();
    }
  };

  // const verificationCodeStr = verificationCode.join('');
  const verifiedCodeAction = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    let payload = {
      phone_verification_code: verificationCode.join(""),
      email: getStorageData(),
    };
    axios
      .post("/api/verify-phone", payload)
      .then((r) => {
        setIsModalOpen(false);
        setnotificationMessage(r.data.data.message);
        navigate("/role_project_Google");
      })
      .catch((e) => {
        setIsModalOpen(false);
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
            {/* <Link to="/"> */}
            <a>
              <img src={ppclogo} className="ppc_logo_design" alt="" />
            </a>
            {/* </Link> */}
          </div>
          <div className="col p-0">
            <div className="progress ">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "60%" }}
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <label className="numberperctage"> Step 3 of 7</label>
          </div>
        </div>
      </>
      <div className="main_div_verification_code row">
        <div className="col-sm-12 col-md-3 col-lg-3 first_div_main">
          <img className="first_div_design" src={designleftside} alt="" />
        </div>
        <div className="mt-4 col-sm-12 col-md-6 col-lg-6">
          <p className="getverficationcode">Enter Verification code</p>
          <p className="projectrolepara">
            Check your Message Inbox for the Verification code
          </p>
          <div className="timer_div">
            0{minutes}:
            {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
          </div>
          <form onSubmit={(e) => verifiedCodeAction(e)}>
            <div className="form-group row main_div_verficication_digit">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="col" key={index}>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id={`number${index + 1}`}
                    name={`number${index + 1}`}
                    className="mt-3 form-control verification_code_digit"
                    placeholder=""
                    ref={(ref) => (numberRefs.current[index] = ref)}
                    value={verificationCode[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="mt-5 sendcodebutton">
              Let’s Proceed
            </button>
            <div className="have_not_received_code">
              <Link to="/verification_code_Google">
                <font color="red">
                  <u>Haven’t Received Code Yet? </u>
                </font>
              </Link>
            </div>
          </form>
        </div>
        <div className="col-sm-3 col-md-6 col-lg-3 p-0"></div>
      </div>
      <>
        <div
          class={`modal fade bd-example-modal-sm ${isModalOpen ? "show" : ""} mt-5`}
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

export default EnterVerificationCodeGoogle;
