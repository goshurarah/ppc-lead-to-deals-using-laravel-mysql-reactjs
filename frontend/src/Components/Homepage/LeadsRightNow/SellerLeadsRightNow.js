import React from "react";
import "./../LeadsRightNow/SellerLeadsStyle.css";
import star from "./../../../Assets/Star.png";
import { Link } from "react-router-dom";
function SellerLeadsRightNow() {
  return (
    <section id="aboutus">
    <div className="seller_lead_main_div">
      <p className="heading_seller_lead">
        Start Getting Motivated Seller Leads RIGHT NOW
      </p>
      <p className="para_seller_lead">
        PPC Leads to Leads is the fastest and easiest way to get the leads you
        need to succeed in your real estate business. We offer the most
        competitive prices in the industry, so you can get the leads you need
        without breaking the bank.
      </p>
      <div className="row container-fluid mt-4 main_div_seller_lead_start">
        <div className="col-lg-2 col-sm-12"></div>
        <div className="col-lg-2 col-sm-12">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-sm-12">
              <img src={star} className="star_pic" />
            </div>
            <div className="col-lg-8 col-md-7  ">
              <p className=" number_star">500+</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-2 col-sm-12"></div>
            <div className="col-lg-8 col-md-10 col-sm-12">
              <p className=" para_number_star">
                Clients get their motivated seller leads every month
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-sm-12">
          <div className="row">
            <div className="col-lg-4 col-md-5 ">
              <img src={star} className="star_pic" />
            </div>
            <div className="col-lg-8 col-md-7 ">
              <p className=" number_star">100+</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-2 col-sm-12"></div>
            <div className="col-lg-8 col-md-10 col-sm-12">
              <p className=" para_number_star">
                Real estate leads we generate every single day
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-sm-12">
          <div className="row">
            <div className="col-lg-4 col-md-5 ">
              <img src={star} className="star_pic" />
            </div>
            <div className="col-lg-8 col-md-7 ">
              <p className=" number_star">98%</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-2 col-sm-12"></div>
            <div className="col-lg-8 col-md-10 col-sm-12">
              <p className=" para_number_star">
                Clients are satisfied with our services
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-sm-12">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <img src={star} className="star_pic" />
            </div>
            <div className="col-lg-8 col-md-7 ">
              <p className=" number_star">3500+</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-2 col-sm-12"></div>
            <div className="col-lg-8 col-md-10 col-sm-12">
              <p className=" para_number_star">
                Clients we’ve helped since we launch PPC Leads to Leads
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-sm-12"></div>
     
      </div>
      <Link to="/register">
      <button className="register_for_free_seller_lead mt-3 mb-5">Register for Free and Get 3 first leads 66% off</button>
      </Link>
    </div>
    </section>
  );
}

export default SellerLeadsRightNow;
