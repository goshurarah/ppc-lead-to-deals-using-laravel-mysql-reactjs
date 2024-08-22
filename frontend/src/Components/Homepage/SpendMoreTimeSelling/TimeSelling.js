import React from "react";
import "./../SpendMoreTimeSelling/TimeSpend.css";
import hotesthand from "./../../../Assets/spend_time_fp.png";
import competitive_price from "./../../../Assets/COMPETITIVE_PRICE.png";
import mobile_friendly from "./../../../Assets/mobile_friendly.png";
import design_right_side_home from "./../../../Assets/home_page_design right_side.PNG";

function TimeSelling() {
  return (
    <div className="main_div_time">
      <p className="heading_time_spend">Spend more time selling</p>
      <p className="para_time_spend">
        Find out seller’s motivation, repairs needed and more BEFORE you commit
        to buying the lead. All leads are guaranteed to be off market.{" "}
      </p>
      <div className="main_timespend_div row">
        <div className="col-lg col-md col-sm-12"></div>
        <div className="col-lg col-md col-sm-12 main_card_spend_time">
          <div className="card_spend_time">
            <img src={hotesthand} className="hotesthandpic" />
            <p className="heading_card_spend_time">
              The hottest leads on the market
            </p>
            <p className="para_card_spend_time">
              We provide the hottest leads on the market. We know that when
              you're looking for new leads, you need the most up-to- date
              information possible.
            </p>
          </div>
        </div>
        <div className="col-lg col-md col-sm-12 main_card_spend_time">
          <div className="card_spend_time">
            <img src={competitive_price} className="hotesthandpic" />
            <p className="heading_card_spend_time">Competitive prices</p>
            <p className="para_card_spend_time">
              We offer the most competitive prices in the industry, so you can
              get the leads you need without breaking the bank.
            </p>
          </div>
        </div>
        <div className="col-lg col-md col-sm-12 main_card_spend_time">
          <div className="card_spend_time">
            <img src={mobile_friendly} className="hotesthandpic" />
            <p className="heading_card_spend_time">User-friendly interface</p>
            <p className="para_card_spend_time">
              We offer user-friendly interface, so you can start buying leads
              right after registration
            </p>
          </div>
        </div>
        <div className="col-lg col-md col-sm-12 main_homepage_design_right">
            <img src={design_right_side_home} className="design_right_side" />
        </div>
      </div>
    </div>
  );
}

export default TimeSelling;
