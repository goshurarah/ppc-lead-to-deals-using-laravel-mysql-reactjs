import React, { useEffect, useState } from "react";
import ReiLeadMarket from "../ReiLeadMarketPlace/ReiLeadMarket";
import TimeSelling from "../SpendMoreTimeSelling/TimeSelling";
import RunningAds from "../WithoutRunningAds/RunningAds";
import SellerLeadsRightNow from "../LeadsRightNow/SellerLeadsRightNow";
import Review from "../Reviews/Review";
import AddEmail from "../AddEmail/AddEmail";
import FooterPpc from "../FooterPpc/FooterPpc";
import RightReserved from "../AllRightReserved/RightReserved";
import "./../Homepage_components_merge/HomepageStyle.css";
import ppclogo from "./../../../Assets/ppclogo.png";
import { Link } from "react-router-dom";
function Homepage() {
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
  return (
    <>
      {/* <Navbar_ppc/> */}
     <><div
          className={`scroll-to-top ${isVisible ? "show" : ""}`}
          onClick={scrollToTop}
        >
          <span>&uarr;</span>
        </div>
        </> 

      <nav className="navbar navbar-expand-lg sticky-top navbarsticky">
        <img src={ppclogo} className="ppc_logo_navbar" />

        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        <button
          className="navbar-toggler bg-light mr-3"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline  my-2 my-lg-0 navbar_main_div ">
            <a href="#reimarket">
              <p className="mx-2 link_navbar_a">Leads marketplace</p>
            </a>
            <a href="#whyus">
              <p className="mx-2 link_navbar_a">Why us?</p>
            </a>
            <a href="#fixedprice">
              <p className="mx-2 link_navbar_a">Fixed Price Mode</p>
            </a>
            <a href="#aboutus">
              <p className="mx-2 link_navbar_a">About Us</p>
            </a>           
            <a href="#review">
              <p className="mx-2 link_navbar_a">Reviews</p>
            </a>
            <Link to="/contact_us">
            <a >
              <p className="mx-2 link_navbar_a">Contact Us</p>
            </a>
            </Link>
            <Link to="/signin">
              <button className="ml-5 login_button_navbar">Login</button>
            </Link>
            <Link to="/register">
              <button className="ml-2 create_account_button">
                Create Account
              </button>
            </Link>
          </form>
        </div>
      </nav>

      <div id="reimarket">
        <ReiLeadMarket />
      </div>
      <div id="whyus">
        <TimeSelling />
      </div>
      <div id="fixedprice">
        <RunningAds />
      </div>
      {/* <div id="aboutus"> */}
        <SellerLeadsRightNow />
      {/* </div> */}
      <div id="review">
        <Review />
      </div>
      <div id="contact">
        <AddEmail />
      </div>

      <FooterPpc />
      <RightReserved />
    </>
  );
}

export default Homepage;
