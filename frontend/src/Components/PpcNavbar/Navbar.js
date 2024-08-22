import React from "react";
import ppclogo from "./../../Assets/ppclogo.png";
import "./../PpcNavbar/NavbarStyle.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <a className="navbar-brand">
            <img src={ppclogo} className="ppclogostyle" alt="" />
          </a>
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
