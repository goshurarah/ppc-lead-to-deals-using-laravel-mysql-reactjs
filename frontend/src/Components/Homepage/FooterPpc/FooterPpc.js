import React from "react";
import "./../FooterPpc/FooterStyle.css";
import ppclogo from "./../../../Assets/ppclogogrey.PNG";
import { Link } from "react-router-dom";
function FooterPpc() {
  return (
    <div className="main_div_footer">
      <img src={ppclogo} className="ppc_logo_style" />
      <div className=" main_div_footer_homepage mt-4">
        <a href="#reimarket">
          {" "}
          <p className="footer_a_tag mx-3">Leads marketplace</p>{" "}
        </a>
        <a href="#whyus">
          {" "}
          <p className="footer_a_tag mx-3">Why us?</p>
        </a>
        <a href="#fixedprice">
          {" "}
          <p className="footer_a_tag mx-3">Fixed Price Mode</p>
        </a>
        <a href="#aboutus">
          {" "}
          <p className="footer_a_tag mx-3">About Us</p>
        </a>
        <Link to="/blogs">
          {/* <a href="#blogs"> */} <p className="footer_a_tag mx-3">Blogs</p>
          {/* </a> */}
        </Link>
        {/* <a href="#privacypolicy"> */}{" "}
        <Link to="/privacypolicy">
          <p className="footer_a_tag mx-3">Privacy Policy</p>
        </Link>
        {/* </a> */}
        <a href="#review">
          {" "}
          <p className="footer_a_tag mx-3">Reviews</p>
        </a>
        <Link to="/contact_us">
          <a>
            {" "}
            <p className="footer_a_tag mx-3">Contact Us</p>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default FooterPpc;
