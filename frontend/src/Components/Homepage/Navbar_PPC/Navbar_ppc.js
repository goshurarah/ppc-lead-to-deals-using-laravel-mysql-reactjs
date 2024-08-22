import React from "react";
import ppclogo from "./../../../Assets/ppclogo.png";
import "./../Navbar_PPC/Navbar_ppc_style.css";

import addemail from "../AddEmail/AddEmail";
import { Link, Navigate, useNavigate } from "react-router-dom";
function Navbar_ppc() {
    const appUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const navigatetohomepage = () => {
navigate("/");
    };
  return (
    <>
    <nav className="navbar navbar-expand-lg sticky-top navbarsticky">

        <img src={ppclogo} className="ppc_logo_navbar" onClick={navigatetohomepage}/>
  
        {/* <a className="navbar-brand" href="/">Navbar</a> */}
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
         
            <a href={`${appUrl}#reimarket`}>
              <p className="mx-2 link_navbar_a">Leads marketplace</p>
            </a>
            <a href={`${appUrl}#whyus`}>
              <p className="mx-2 link_navbar_a">Why us?</p>
            </a>
            
            <a href={`${appUrl}#fixedprice`}>
              <p className="mx-2 link_navbar_a">Fixed Price Mode</p>
            </a>
         
                   <a href={`${appUrl}#aboutus`}>
              <p className="mx-2 link_navbar_a">About Us</p>
            </a>           
   
            <a href={`${appUrl}#review`}>
              <p className="mx-2 link_navbar_a">Reviews</p>
            </a>
            <Link to="/contact_us">
            <a>
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
    </>
  );
}

export default Navbar_ppc;
