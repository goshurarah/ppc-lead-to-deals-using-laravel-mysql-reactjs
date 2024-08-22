import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./../MainMenu/paymentStyle.css";
import { useNavigate } from "react-router-dom";
import CustomNotification from "../CustomNotification/CustomNotification";
import MainMenu from "./MainMenu";
import { usePaymentContext } from "./PaymentContext";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
function PaymentForm(leadid, leadprice, closeModal) {
  const leadsdatainarray = [];

  const { leadsresponse, setleadsresponse } = usePaymentContext();
  const [leaddataafterleadpurchase, setleaddataafterleadpurchase] =
    useState("");

  const [statuscode, setstatecode] = useState("");
  const [messageofleadbuy, setmessageofleadbuy] = useState("");

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [response, setresponse] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cardElement, setCardElement] = useState(null);
  const sendpayment = (token_id, lead_id, lead_price) => {
    // e.preventDefault();
    setIsLoading(true);
    var price_lead = Number(lead_price);

    let payload = {
      lead_id: lead_id,
      amount: price_lead,
      stripe_token: token_id,
    };
    axiosInstance
      .post("/api/dashboard/make-payment", payload)
      .then((r) => {
        // alert(r.data.data.message);
        setCardElement(null);
        setresponse(r?.data?.data?.message);

        setleaddataafterleadpurchase(r?.data?.data?.lead_data);
        setmessageofleadbuy(r?.data?.data?.message);
        setstatecode(r?.data?.data?.status_code);
        createPurchasedLead(r?.data?.data);
        setIsLoading(false);
      })
      .catch((token_id) => {
        if (token_id.response.data.errors != undefined) {
          setIsLoading(false);
        }
      });
  };

  const createPurchasedLead = (leaddata) => {
    // e.preventDefault();

    let payload = {
      status_code: leaddata?.status_code,
      message: leaddata?.message,
      lead_data: leaddata?.lead_data,
    };
    axiosInstance
      .post("/api/dashboard/create-purchased-leads", payload)
      .then((r) => {
        // alert(r.data.data.message);
        // setresponse(r?.data?.data?.message);
      })
      .catch((token_id) => {
        if (token_id.response.data.errors != undefined) {
        }
      });
  };

  const stripe = useStripe();
  const elements = useElements();

  const backtoleads = () => {
    navigate("/dashboard");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      // console.log("[error]", error);
    } else {
      // console.log("[Token]", token);
      const token_id = token?.id;
      const lead_id = leadid.leadid;
      const lead_price = leadid.leadprice;

      sendpayment(token_id, lead_id, lead_price);

      // Send the paymentMethod.id to your server to complete the payment
    }
  };
  return (
    <>
      
      <form onSubmit={handleSubmit}>
      <CardElement key={cardElement ? "reset" : "initial"}  onReady={(el) => setCardElement(el)} />
        <button
          type="submit"
          class="btn btn-success pay_now_buton"
          disabled={!stripe}
        >
          
          {isLoading ? <SpinnerLoader /> : "Pay now"}
        </button>
        <p className="success_response">
          {response ? <CustomNotification message={response} /> : null}
        </p>
      </form>
    </>
  );
}

export default PaymentForm;
