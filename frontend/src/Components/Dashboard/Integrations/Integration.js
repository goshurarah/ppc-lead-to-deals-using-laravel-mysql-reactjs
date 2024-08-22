import React, { useEffect, useState } from "react";
import "./../Integrations/IntegrationStyle.css";
import webhook_pic from "./../../../../src/Assets/webhook_url_icon.png";
import axios from "axios";
import RedNotification from "../CustomNotification/RedNotification";
import CustomNotification from "../CustomNotification/CustomNotification";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";

function Integration() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    // Show the scroll-to-top button when the user has scrolled down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    scrollToTop();
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };


  }, []);
  
  const [webhookurl, setWebhookUrl] = useState("");

  const [toggleStatus, setToggleStatus] = useState("inactive");

  const [inputs, setInputs] = useState([{ key: "", value: "" }]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  // Fetch integration data on component mount
  useEffect(() => {
    fetchIntegrationData();
    gettheleadpurshadeddata();
    // setleadsdataintegration(leadsresponse);
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInputs = [...inputs];
    updatedInputs[index][name] = value;
    setInputs(updatedInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { key: "", value: "" }]);
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchIntegrationData = async () => {
    try {
      const res = await axiosInstance.get(`/api/dashboard/integrations`);
      const data = res?.data?.integration;
      if (data) {
        setWebhookUrl(data.webhook_url);
        setToggleStatus(data.status === "active");
        setInputs(data.http_headers);
      }
    } catch (error) {
      console.error("Error fetching integration data:", error);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const payload = {
      webhook_url: webhookurl,
      http_headers: inputs,
      status: toggleStatus ? "active" : "inactive",
    };

    // Now call the createIntegrationActionWebhook function here
    try {
      const res = await axiosInstance.post(
        "/api/dashboard/integrations",
        payload
      );
      setNotificationMessage(res.data.message);
      setErrorNotification(null);

      setTimeout(() => {
        setNotificationMessage("");
        setErrorNotification(null);
      }, 4000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      setErrorNotification(errorMessage);
      setNotificationMessage(null);
      setTimeout(() => {
        setErrorNotification(null);
      }, 4000);
    }
  };

  const handleTestSettings = async (e) => {
    e.preventDefault();
    const payload = {
      webhook_url: webhookurl,
      http_headers: inputs,
    };

    // Now call the createIntegrationActionWebhook function here
    try {
      const res = await axiosInstance.post(
        "/api/dashboard/test-integration",
        payload
      );
      setNotificationMessage(res.data.data);
      setErrorNotification(null);
      setTimeout(() => {
        setNotificationMessage("");
        setErrorNotification(null);
      }, 4000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      setErrorNotification(errorMessage);
      setNotificationMessage(null);
      setTimeout(() => {
        setNotificationMessage("");
        setErrorNotification(null);
      }, 4000);
    }
  };

  const [getcarddetailofleads, setgetcarddetailofleads] = useState("");
  const gettheleadpurshadeddata = () => {
    axiosInstance
      .get("/api/dashboard/get-purchased-leads")
      .then((res) => {
        setgetcarddetailofleads(res?.data);
      })
      .catch((e) => {
        if (e.response.status == 404) {
          // seterrorMessage(e.response.data.message);
          alert(e);
          // navigate("/signin");
          // setValidationErrors(e.errors);
        } else {
          // seterrorMessage(e.response.data.message);
          // alert("internal server error");
          // navigate("/signin");
          // setValidationErrors(e.errors);
        }
      });
  };

  const date_change = (date_create_at) => {
    const dateString = date_create_at;
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so we add 1 to get the correct month number
    const day = date.getUTCDate();

    // Format the date as a string (optional)
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };
  return (
    <div>
      {notificationMessage && (
        <CustomNotification message={notificationMessage} />
      )}
      {errorNotification && <RedNotification message={errorNotification} />}
      <div className="container-fluid">
        {/* <form onSubmit={handleSaveSettings}> */}
        <div className="row">
          <div className="col-lg-6 col-md-12 main_div_integration">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-4">
                <p className="active_status_para">Active Status</p>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <div className="col-lg-3 col-md-6 col-6 toggle_div_st_setting">
                  <input
                    type="checkbox"
                    id="switch"
                    checked={toggleStatus}
                    onChange={(e) => setToggleStatus(e.target.checked)}
                  />
                  <label className="labelintegration" htmlFor="switch">
                    Toggle
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 webhook_url_div_first_input">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-2">
                    <img
                      src={webhook_pic}
                      alt="webhook"
                      className="webhook_picture"
                    />
                  </div>
                  <div className="col-lg-11 col-md-11 col-9">
                    <input
                      required
                      className="input_style_webhook"
                      placeholder="webhook"
                      value={webhookurl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="http_header_para">Http headers:</p>
            <div className="main_hhtp_header_div">
              <div className="row">
                {inputs?.map((input, index) => (
                  <React.Fragment key={index}>
                    <div className="col-lg-3 col-md-3 col-3 webhook_url_div">
                      <input
                        className="input_style_webhook"
                        placeholder="Key *"
                        name="key"
                        value={input.key}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 webhook_url_div">
                      <input
                        className="input_style_webhook"
                        placeholder="Value *"
                        name="value"
                        value={input.value}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-lg-1 col-md-1 col-1">
                      {index >= 0 && (
                        <button
                          className="blue-plus-button"
                          onClick={() => handleRemoveInput(index)}
                        >
                       -
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ))}
                <div className="col-lg-1 col-md-1 col-1">
                  <button
                    className="blue-plus-button"
                    onClick={() => handleAddInput()}
                  >
                  +
                  </button>
                </div>
              </div>
            </div>

            <div className="main_end_div">
              <button className="end-button" onClick={handleTestSettings}>
                Send Test
              </button>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 lead_response_main_div">
            <div className="">
              {getcarddetailofleads ? (
                getcarddetailofleads?.purchased_leads?.map((data, index) => (
                  <>
                    <div className="card_main_lead_purchased" key={index}>
                      <div className="created_div_date">
                        <p className="created_at_para">
                          Lead Purchased on: {date_change(data?.updated_at)}{" "}
                        </p>
                      </div>
                      <div className="mian_div_lead_data">
                        <p className="created_at_para">
                          <b>Status:</b> {data?.status_code}
                        </p>
                        <p className="created_at_para">
                          <b>Message:</b> {data?.message}{" "}
                        </p>
                        <div className="row">
                          {" "}
                          <div className="col-lg-6">
                            {" "}
                            <p className="created_at_para">
                              <b>Lead Data</b>{" "}
                            </p>
                          </div>
                          {/* <div className="col-lg-6"> <button className="more_detail_btn_in_card_leads">..more detail</button></div> */}
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            {" "}
                            <p className="created_at_para">
                              <b>Price:</b> {data?.lead_data.asking_price}${" "}
                            </p>
                          </div>
                          <div className="col-lg-2">
                            {" "}
                            <p className="created_at_para">
                              <b>Bed :</b> {data?.lead_data?.beds}{" "}
                            </p>
                          </div>
                          <div className="col-lg-2">
                            {" "}
                            <p className="created_at_para">
                              <b>Bath:</b> {data?.lead_data?.baths}{" "}
                            </p>
                          </div>
                          <div className="col-lg-4">
                            <p className="created_at_para">
                              <b>Garage:</b> {data?.lead_data?.garage}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <SpinnerLoader />
              )}
            </div>
          </div>
        </div>
        <button
          className="save_setting_int"
          onClick={handleSaveSettings}
          disabled={!toggleStatus}
        >
          Save Settings
        </button>
        {/* </form> */}
      </div>

      <>
        {" "}
        <TicketandLiveChat />
      </>
    </div>
  );
}

export default Integration;
