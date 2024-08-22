import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import axios from "axios";

function VerifyEmail() {
  const navigate = useNavigate();
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    const start_point = "/verify-email/";
    const end_point = "/";

    const start_index = url.indexOf(start_point) + start_point.length;
    const end_index = url.indexOf(end_point, start_index);

    const sliced_url = url.substring(start_index, end_index);

    const pattern = new RegExp(`${start_point}(.*?)${end_point}`);
    const match = url.match(pattern);
    const sliced_url_regex = match ? match[1] : "";


    const emailRegex = /\/verify-email\/[^/]*\/([^/]+)/;
    const matches = url.match(emailRegex);
    const email = matches ? matches[1] : "";

    verifyAction(email, sliced_url_regex);
  }, []);

  const verifyAction = (email, emailVerificationToken) => {
    let payload = {
      email: email,
      email_verification_token: emailVerificationToken,
    };
    axios
      .post("/api/verify-email", payload)
      .then((r) => {
        setnotificationMessage(r.response.data.message.message);
        localStorage.removeItem("token");
    
        // navigate("/");
      })
      .catch((e) => {

        
        if (e.response.data.errors !== undefined) {
          setnotificationMessage(e.response.data.message.message);
          // navigate("/");
          // setValidationErrors(e.response.data.errors);
          setTimeout(() => {
            setnotificationMessage("");
          }, 4000);
        
        }
        else{    
            // setnotificationMessageRed(e.response.data.message);

          }
        }
      );
  };

  return (
    <div>
      <>
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
      <>
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
    </div>
  );
}

export default VerifyEmail;
