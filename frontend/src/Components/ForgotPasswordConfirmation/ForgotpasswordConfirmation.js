import React from "react";
import "./../ForgotPasswordConfirmation/PasswordConfirmationStyle.css";
import ppclogo from "./../../Assets/ppclogo.png";
function ForgotpasswordConfirmation() {
  return (
    <div className="mainpassword_comp row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6 main_pconfirmation">
        <a href="#">
          <img
            src={ppclogo}
            className="ppc_logo_newpasswordconfirmation"
            alt=""
          />
        </a>
        <div className="passwordconfirmation_maindiv">
          <button type="submit" className=" resetpasswordconfirmationbutton btn">
          Reset Password
          </button>
        </div>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
}

export default ForgotpasswordConfirmation;
