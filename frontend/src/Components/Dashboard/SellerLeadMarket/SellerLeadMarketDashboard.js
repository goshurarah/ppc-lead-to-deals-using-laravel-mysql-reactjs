import React from "react";
import "./SellerLeadStyle.css";
function SellerLeadMarketDashboard() {
  return (
    <>
      <div className="d-flex justify-content-between main_div_seller_lead " >
        <div className="px-5">
          <p className="seller_lead_market_heading">
            Seller Leads Marketplace
          </p>
          <button className="market_button">Total leads: 97227</button>
          <button className="market_button ">Total Members: 15868 </button>
        </div>

        <div className="ml-auto  main_below_navbar">
          <button className="cash_offer_lead mx-2">
            Cash Offer Leads for Investors
          </button>
          <button className="end_cash_buyer_lead mx-2">
            End Cash Buyer Lead
          </button>
          <button className="end_cash_buyer_lead mx-2">
            Listing Leads for Agents
          </button>
        </div>
      </div>
    </>
  );
}

export default SellerLeadMarketDashboard;
