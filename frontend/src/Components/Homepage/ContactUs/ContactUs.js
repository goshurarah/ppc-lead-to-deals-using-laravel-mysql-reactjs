import React, { useEffect, useState } from "react";
import "./../ContactUs/ContactUsStyle.css";
import Navbar_ppc from "../Navbar_PPC/Navbar_ppc";
import { Link } from "react-router-dom";
import ppclogo from "./../../../Assets/ppclogogrey.PNG";
import RightReserved from "../AllRightReserved/RightReserved";
import CustomNotification from "../../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../../Dashboard/CustomNotification/RedNotification";
import axios from "axios";
import SpinnerLoader from "../../Dashboard/SpinnerLoader/SpinnerLoader";
import AddEmail from "../AddEmail/AddEmail";
function ContactUs() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // Show the scroll-to-top button when the user has scrolled down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    scrollToTop();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const appUrl = process.env.REACT_APP_API_URL;

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [message, setmessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(
    firstname,
    "firstname",
    lastname,
    "lastname",
    email,
    " email",
    phone,
    "phone",
    message,
    "message"
  );
  const contactusAction = (e) => {
    e.preventDefault();

    setIsModalOpen(true);
    let payload = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: phone,
      your_message: message,
    };
    axios
      .post("/api/contact_us", payload)
      .then((r) => {
        setIsModalOpen(false);
        console.log(r, "response");
        setfirstname("");
        setlastname("");
        setEmail("");
        setphone("");
        setmessage("");

        setNotificationMessage(r?.data?.message);

        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        console.log(e, "error");
        setIsModalOpen(false);
        setnotificationMessageRed(e.message);
        setnotificationMessageRed(e.response.data.message);
        setTimeout(() => {
          setnotificationMessageRed("");
        }, 4000);
        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          setnotificationMessageRed(e.response.data.message);
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
      <Navbar_ppc />
      <>
        <div className="row p-0 m-0">
          <div className="col-lg-3 col-md-3 col-12 m-0 p-0"></div>
          <div className="col-lg-6 col-md-6 col-12">
            <form onSubmit={(e) => contactusAction(e)}>
              <div className="main_div_contact_us">
                <p className="heading_contact_us">Contact Us</p>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <input
                      className="input_style_fn_contact_us"
                      placeholder="First Name"
                      required
                      onChange={(e) => {
                        setfirstname(e.target.value);
                      }}
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <input
                      className="input_style_fn_contact_us"
                      placeholder="Last Name"
                      required
                      onChange={(e) => {
                        setlastname(e.target.value);
                      }}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <input
                className="input_style_fn_contact_us"
                placeholder="Phone"
                required
                onChange={(e) => {
                  setphone(e.target.value);
                }}
                type="phone"
              />
              <input
                className="input_style_fn_contact_us"
                placeholder="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
              />

              <textarea
                className="input_style_message_contact_us"
                placeholder="Message"
                required
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
              />
              <div className="main_div_contact_us">
                <button className="submit_button_style_contact" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-md-3 col-12 m-0 p-0"></div>
        </div>
        <>
          <AddEmail />
        </>
        <>
          <div className="main_div_footer">
            <Link to="/">
              <img src={ppclogo} className="ppc_logo_style" />
            </Link>
            <div className="main_div_footer_contents mt-4">
              <a href={`${appUrl}#reimarket`}>
                <p className="footer_a_tag mx-3">Leads Marketplace</p>
              </a>

              <a href={`${appUrl}#whyus`}>
                <p className="footer_a_tag mx-3">Why Us?</p>
              </a>

              <a href={`${appUrl}#fixedprice`}>
                <p className="footer_a_tag mx-3">Fixed Price Mode</p>
              </a>

              <a href={`${appUrl}#aboutus`}>
                <p className="footer_a_tag mx-3">About Us</p>
              </a>

              <Link to="/blogs">
                {/* <a href="#blogs"> */}
                <p className="footer_a_tag mx-3">Blogs</p>
                {/* </a> */}
              </Link>

              <Link to="/privacypolicy">
                <p className="footer_a_tag mx-3">Privacy Policy</p>
              </Link>

              <a href={`${appUrl}#review`}>
                <p className="footer_a_tag mx-3">Reviews</p>
              </a>

              <Link to="/contact_us">
                <a>
                  <p className="footer_a_tag mx-3">Contact Us</p>
                </a>
              </Link>
            </div>
          </div>
        </>
        <RightReserved />
      </>
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
  );
}

export default ContactUs;
