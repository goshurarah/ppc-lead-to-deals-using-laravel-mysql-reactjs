import React, { useEffect } from "react";
import designleftside from "./../../Assets/designleftside.PNG";
import "./../DesiredCity/DesiredCityStyle.css";
import ppclogo from "./../../Assets/ppclogo.png";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";

function DesiredCity() {
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  const navigate = useNavigate();
  const [checkbox, setCheckBOX] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    return () => {
      getEmailData();
    };
  });
  const getEmailData = () => {
    const savedItem = localStorage.getItem("email");
    return savedItem;
  };

  
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleCheckboxChange = (e, checkboxValue) => {
    if (e.target.checked) {
      // Remove the check for the maximum number of checkboxes
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== checkboxValue)
      );
    }
    // Remove the limit check code
  };

  // localStorage.setItem("counties", JSON.stringify(selectedCheckboxes));

  const projectStateSelectionAction = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    let payload = {
      email: getEmailData(),
      cities_ids: selectedCheckboxes,
    };
    axios
      .post("/api/add-user-cities", payload)
      .then((r) => {
        // setnotificationMessage(r.data.data.message);
        setIsModalOpen(false);
        setnotificationMessage("Sign-up done. Now Signin.");
        setTimeout(() => {
          navigate("/signin");
        }, 4000);
      })
      .catch((e) => {
        setIsModalOpen(false);
        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          setIsModalOpen(false);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  const [query, setQuery] = useState("");
  useEffect(() => {
    return () => {
      getstateData();
    };
  });
  const getstateData = () => {
    const savedItemstate = localStorage.getItem("counties");
    const stateIds = savedItemstate ? JSON.parse(savedItemstate) : [];
    const url =
      "/api/get-cities-dropdown?counties_ids[]=" +
      stateIds.join("&counties_ids[]=");

    return url;
  };

  const urlgetcounty = getstateData();
  const [cityData, setCityData] = useState("");

  useEffect(() => {
    fetchSecondDropdownData();
  }, []);
  const fetchSecondDropdownData = () => {
    axios.get(urlgetcounty).then((res) => {
      setCityData(res.data);
    });
  };
  return (
    <>
      {notificationMessage && (
        <CustomNotification message={notificationMessage} />
      )}
      {notificationMessageRed && (
        <RedNotification message={notificationMessageRed} />
      )}
      <div className="row justify-content-between mainnavbardiv">
        <div className="col p-0">
          {/* <Link to="/"> */}
          <a>
            <img src={ppclogo} className="ppc_logo" alt="" />
          </a>
          {/* </Link> */}
        </div>
        <div className="col p-0">
          <div className="progress ">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <label className="numberperctage"> Step 7 of 7</label>
        </div>
      </div>
      <form onSubmit={(e) => projectStateSelectionAction(e)}>
        <div className="main_div_role row">
          <div className="col-sm-12 col-md-4 col-lg-4 maindesign">
            <img className="first_div_style_city" src={designleftside} alt="" />
          </div>
          <div className="mt-5 col-sm-12 col-md-4 col-lg-4">
            <p className="desiredstateheading">
              Please select the Desired City
            </p>
            <p className="projectrolepara">Where are you Looking to buy ?</p>
            <div className="desiredstatediv">
              <div className="mt-2 row px-3">
                <div className="col-sm-4">
                  <p className="selectedfrom">
                    Selected {selectedCheckboxes.length}
                  </p>
                </div>
                <div className="col-sm-6">
                  <input
                    className="inputsearchcity"
                    placeholder="Search"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="main_div_scroll_state">
                {cityData.data ? (
                  cityData.data
                    .filter((post) => {
                      if (query === "") {
                        return post;
                      } else if (
                        post.name.toLowerCase().includes(query.toLowerCase())
                      ) {
                        return post;
                      }
                    })
                    .map((country, index) => (
                      <div key={index} className="row mx-5">
                        <div className="col-2 checkbox_style_desired_city">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`checkbox_${index}`}
                            name={`checkbox_${index}`}
                            checked={selectedCheckboxes.includes(country?.id)}
                            onChange={(e) => {
                              handleCheckboxChange(e, country?.id);
                            }}
                          />
                        </div>
                        <p className="col-10 statenamestyle">{country.name}</p>
                      </div>
                    ))
                ) : (
                  <SpinnerLoader />
                )}
              </div>
            </div>

            <button type="submit" className="mt-5 checkboxbuttonforcitysubmit">
              Let’s Find Fresh Leads
            </button>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 p-0"></div>
        </div>
      </form>
      <>
        <div
          class={`modal fade bd-example-modal-sm ${isModalOpen ? "show" : ""} mt-5`}
          style={{ display: isModalOpen ? "block" : "none" }}
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden={!isModalOpen}
        >
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <SpinnerLoader />
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default DesiredCity;
