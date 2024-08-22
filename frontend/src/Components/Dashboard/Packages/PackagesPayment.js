import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./../MainMenu/paymentStyle.css";
import { useNavigate } from "react-router-dom";
import CustomNotification from "../CustomNotification/CustomNotification";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

function PackagesPayment(subscription, subscriptionprice) {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(subscription, "subscription    detail in modal");
  console.log(subscriptionprice, "subscriptionprice    detail in modal");
  const [response, setresponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const sendpayment = (token_id, subscription, subscriptionprice) => {
    // e.preventDefault();
    console.log(subscription, "subscription details in functions call");
    console.log(subscriptionprice, "subscriptionprice details in functions call");
    setIsLoading(true);
    // var price_lead = Number(lead_price);

    let payload = {
      package_id: subscription,
      price: subscriptionprice,
      stripe_token: token_id,
    };
    axiosInstance
      .post("/api/dashboard/subscriptions", payload)
      .then((r) => {
        // alert(r.data.data.message);
        setCardElement(null);
        setresponse(r?.data?.message);
        setIsLoading(false);

        setTimeout(() => {
          setresponse("");
        }, 4000);
        // window.location.reload();

        // navigate("/dashboard");
        // alert(r?.data?.data?.message)
        // localStorage.setItem("token", r.data.data.token);
      })
      .catch((token_id) => {
        if (token_id.response.data.errors != undefined) {
          // alert(e.response.data.message)
          // handleShowError();
          //   alert(e.response.data.message)
          //   setValidationErrors(e.response.data.errors);
        }
      });
  };

  const stripe = useStripe();
  const elements = useElements();

  const backtoleads = () => {
    navigate("/dashboard");
  };

  const [cardElement, setCardElement] = useState(null);
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
      sendpayment(token_id, subscription?.subscription, subscription?.subscriptionprice );
   
      // Send the paymentMethod.id to your server to complete the payment
    }
  };
  const [notificationMessage, setNotificationMessage] = useState(null);
  return (
    <>
      {/* {isLoading && <SpinnerLoader />} */}
      <>
        {" "}
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
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

export default PackagesPayment;
