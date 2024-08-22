import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../Dashboadpage/Dashboard.css";
import Dashboard_Sidebar_Maincontent from "../DashboardPanelMain/Dashboard_Sidebar_Maincontent";
function DashboardPpc() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");


  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [userprofiledata, setuserprofiledata] = useState("");
  useEffect(() => {
    getuserprofiledata();
  }, []);

  const getuserprofiledata = () => {
    axiosInstance.get(`/api/dashboard/user-profile`).then((res) => {
      setuserprofiledata(res.data.data);
      setFirstName(res.data.data.first_name);
      setLastName(res.data.data.last_name);
    });
  };


  const getInitials = (name) => {
    return name.charAt(0);
  };
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg">
        <div className="main_div_seller_lead_market_nav">
          <div className="row">
            <div className="col-lg-5">
              <img src={ppclogo} className="ppc_logo_navbar_dashboard" />
            </div>
            <div className="col-lg-7 ">
              <p className="seller_lead_para_market_nav">
                Seller Leads Marketplace
              </p>
              <div className="row">
                <div className="col-lg-5 col-md-5">
                  <button className="market_button_nav">
                    Total leads: 97227
                  </button>
                </div>
                <div className="col-lg-6 col-md-6">
                  <button className="market_button_nav">
                    Total Members: 15868
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

   
        <button
          className="navbar-toggler bg-light m-3"
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
          <form className="form-inline  my-2 my-lg-0 navbar_main_div_ppc_dashboard ">
            <button className="our_price_package mx-2">
              <img src={price_package_pic} />
            </button>
            <div>
              <p className="mx-2 button_navbar">OUR PACKAGE PRICING </p>
              <p className=" button_navbar_para">
                Subscribe to see even more info about each lead
              </p>
            </div>
            <div className="vl mx-2"></div>
            <button className="our_price_package mx-1">
              <img src={ticket} />
            </button>
            <div className="vl mx-2"></div>
            <button className="our_price_package mx-2">
              <img src={message} />
            </button>
            <button className="our_price_package mx-2">
              <img src={bell_icon} />
            </button>
            <div className="vl mx-2"></div>
            <button className="our_price_package mx-3">
              <img src={total_balance} />
            </button>
            <div>
              <p className="mx-1 button_navbar">
                Total Balance{" "}
                <img
                  className="total_balance_detail_icon"
                  src={total_balance_detail}
                />
              </p>
              <p className="price_total">$0.00 </p>
            </div>
            <div className="vl mx-2"></div>
            <button className="profile_button mx-3">
            
              <p className="firstletterpara">
                {firstname ? getInitials(firstname) : null}
                {lastname ? getInitials(lastname) : null}
              </p>
            </button>
            <div>
              <p className="mx-1 profile_name_navbar">{firstname ? firstname : null}</p>
            </div>
          </form>
        </div>
      </nav> */}

      {/* <SellerLeadMarketDashboard/> */}
      <Dashboard_Sidebar_Maincontent />
    </>
  );
}

export default DashboardPpc;
