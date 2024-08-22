import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import CustomNotification from "../CustomNotification/CustomNotification";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import { useNavigate } from "react-router-dom";
import "./../Profile_User/CardPaymentStyle.css";

function CardPayment() {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [response, setresponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const sendpayment = (token_id) => {
    setIsLoading(true);
    let payload = {
      stripe_token: token_id,
    };
    axiosInstance
      .post("/api/dashboard/payment/add-card", payload)
      .then((r) => {
        setresponse(r?.data?.message);
        setIsLoading(false);
      })
      .catch((token_id) => {
        if (token_id.response.data.errors != undefined) {
        }
      });
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
    } else {
      const token_id = token?.id;
      sendpayment(token_id);

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
        <CardElement />
        <button
          type="submit"
          class="btn btn-success add_buton_modal"
          disabled={!stripe}
        >
          {isLoading ? <SpinnerLoader /> : "Add"}
        </button>
        <p className="success_response">
          {response ? <CustomNotification message={response} /> : null}
        </p>
      </form>
    </>
  );
}

export default CardPayment;
