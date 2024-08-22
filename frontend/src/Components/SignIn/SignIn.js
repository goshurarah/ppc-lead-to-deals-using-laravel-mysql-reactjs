import React, { useEffect, useState } from "react";
import design from "./../../Assets/design.PNG";
import "./SignInStyle.css";
import Navbar from "../PpcNavbar/Navbar";
import googleicon from "./../../Assets/google_icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [blogcommnets, setblogcommnets] = useState("");
  const [blogreply, setblogreply] = useState("");

  const [blogid, setblogid] = useState("");
  useEffect(() => {
    setblogcommnets(localStorage.getItem("comment"));
    setblogreply(localStorage.getItem("reply"));
    setblogid(localStorage.getItem("blogid"));
  }, []);

  console.log(
    blogcommnets,
    "blogcommnets",
    blogreply,
    "blogreply",
    blogid,
    "blogid"
  );

  const registerAction = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsModalOpen(true);
    let payload = {
      email: email,
      password: password,
    };
    axios
      .post("/api/login", payload)
      .then((r) => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        localStorage.setItem("token", r.data.data.token);
        // navigate("/dashboard");
        if ((blogcommnets !== null || blogcommnets !== "") || (blogreply !== null || blogreply !== "")) {
          // Check if blogid is not null before navigating to the blog route
          if (blogid !== null) {
            // Navigate to the specified route using the blogid variable
            navigate(`/blogs/${blogid}`);
          } else {
            // Navigate to the dashboard if blogid is null
            navigate("/dashboard");
          }
        } else {
          // Navigate to the dashboard
          navigate("/dashboard");
        }
        
        
      })
      .catch((e) => {
        console.log(e, "error");
        setIsSubmitting(false);
        setIsModalOpen(false);
        setnotificationMessageRed(e.message);
        setnotificationMessageRed(e.response.data.message);
        setTimeout(() => {
          setnotificationMessageRed("");
        }, 4000);
        if (e.response.data.errors != undefined) {
          setValidationErrors(e.response.data.errors);
          // alert(e.response.data.message);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  //registration with google
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [googleLoginUrl, setGoogleLoginUrl] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/google", { headers: { accept: "application/json" } })
      .then((response) => {
        setGoogleLoginUrl(response.data.url);
      })
      .catch((error) => console.error(error));
  }, []);

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
      <Navbar />
      <div className="mt-3 main_signin_div role row">
        <div className="col-sm-4 col-md-4 col-lg-4"></div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <p className="signin ">SignIn</p>
          <p className="signinpara">Welcome to #1 leads marketplace</p>
          <form onSubmit={(e) => registerAction(e)}>
            <div className="form-group">
              <input
                type="email"
                className="mt-3 form-control inputStyle"
                placeholder="E-mail"
                required
                pattern="[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                title="example@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <div className="inputpassworddiv">
                <input
                  required
                  type={passwordVisible ? "text" : "password"}
                  className="mt-3 form-control inputStyle"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
                <i
                  className="fa fa-eye eye_login_in"
                  style={{ color: passwordVisible ? "blue" : "lightgray" }}
                  onClick={handleTogglePassword}
                ></i>
              </div>
              <div id="message">
                <h3>Password must contain the following:</h3>
                <p id="letter" className="invalid">
                  A <b>lowercase</b> letter
                </p>
                <p id="capital" className="invalid">
                  A <b>capital (uppercase)</b> letter
                </p>
                <p id="number" className="invalid">
                  A <b>number</b>
                </p>
                <p id="length" className="invalid">
                  Minimum <b>8 characters</b>
                </p>
              </div>
            </div>
            <div className="mt-3">
              <p className="forgotpasswordpara">
                Forget your password?
                <Link to="/password_reset">
                  {" "}
                  <font color="red">
                    <u> Click Here</u>
                  </font>
                </Link>
              </p>
            </div>

            <button type="submit" className=" freshleadbuttonsignin btn">
              Let’s Find Fresh Leads
            </button>
          </form>
          <p className="orstyle mt-4">OR</p>

          <Link to="/register">
            <button className="mt-1 signinforfreeebutton btn">
              Sign Up For Free
            </button>
          </Link>
          {googleLoginUrl && (
            <>
              <p className="orstyle mt-4">OR</p>
              <a className="mt-1 googlesigninbutton btn" href={googleLoginUrl}>
                <img src={googleicon} className="googleiconstyle" /> Sign Up
                With Google
              </a>
            </>
          )}
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4 maindesign">
          <img className="third_design_div_signin" src={design} />
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

export default SignIn;
