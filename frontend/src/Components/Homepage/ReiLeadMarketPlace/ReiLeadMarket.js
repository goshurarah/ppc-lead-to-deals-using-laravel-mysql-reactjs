import React from "react";
import "./../ReiLeadMarketPlace/Reistyle.css";
import designrei from "./../../../Assets/home_page_design.PNG";
import { Link } from "react-router-dom";
function ReiLeadMarket() {
  return (
    <div className="rei_main_div p-0 row">
      <div className="col-lg-2 col-md-2 p-0 first_div_rei_lead">
        <img
          SRC={designrei}
          className="first_div_rei_lead_image"
        />
      </div>
      <div className="col-lg-2 col-md-2 p-0  second_div_rei_lead">
        <p className="second_div_rei_lead_text">#1</p>
      </div>
      <div className="col-lg-8 col-md-8 p-0 ">
        <div>
          <p className="third_div_lead_heading"> R.E. Leads Marketplace</p>
        </div>
        <div>
          <p className="third_div_lead_paragraph">
            With PPC Leads to Deals - you now have a source of motivated sellers
            that came inbound - so their motivation is higher than any other
            source of leads. Plus - you will love using this revolutionary
            marketplace with a ton of convenient features.
          </p>
        </div>
        <div>
        <Link to="/register">
          <button className="third_div_lead_button_free_registration">
            Get First Three Leads 66% Off within 24 hrs of Free Registration
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReiLeadMarket;
