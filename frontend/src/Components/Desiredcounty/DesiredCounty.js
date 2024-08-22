import React, { useEffect } from "react";
import "./../Desiredcounty/DesiredCounty.css";
import ppclogo from "./../../Assets/ppclogo.png";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import design from "./../../Assets/design.PNG";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";
function DesiredCounty() {
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
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== checkboxValue)
      );
    }
    // Remove the limit check code
  };

  localStorage.setItem("counties", JSON.stringify(selectedCheckboxes));

  const projectStateSelectionAction = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    let payload = {
      email: getEmailData(),
      counties_ids: selectedCheckboxes,
    };
    axios
      .post("/api/add-user-counties", payload)
      .then((r) => {
        // alert(r.data.data.message);
        setIsModalOpen(false);
        setnotificationMessage(r.data.data.message);
        navigate("/city");
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

          // setValidationErrors(e.errors);
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
    const savedItemstate = localStorage.getItem("states");
    const stateIds = savedItemstate ? JSON.parse(savedItemstate) : [];
    const url =
      "/api/get-counties-dropdown?state_ids[]=" +
      stateIds.join("&state_ids[]=");

    return url;
  };

  const urlgetcounty = getstateData();
  const [countyData, setCountyData] = useState("");

  useEffect(() => {
    fetchSecondDropdownData();
  }, []);
  const fetchSecondDropdownData = () => {
    axios.get(urlgetcounty).then((res) => {
      setCountyData(res.data);
    });
  };
  return (
    <>
      <>
        {" "}
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
      <>
        {" "}
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <>
        <div className="row justify-content-between mainnavbardivcounty">
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
                style={{ width: "95%" }}
                aria-valuenow="95"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <label className="numberperctage"> Step 6 of 7</label>
          </div>
        </div>
      </>
      <form onSubmit={(e) => projectStateSelectionAction(e)}>
        <div className="main_div_role_county row">
          <div className="col-sm-12 col-md-4 col-lg-4 "></div>
          <div className="mt-5 col-sm-12 col-md-4 col-lg-4">
            <p className="desiredcountyheading">
              Please select the Desired County
            </p>
            <p className="projectroleparacounty">
              Where are you Looking to buy ?
            </p>
            <>
              <div className="desiredcountydiv">
                <div className="mt-2 row px-3 ">
                  <div className="col-sm-4 ">
                    <p className="selectedfrom">
                      Selected {selectedCheckboxes?.length}
                    </p>
                  </div>
                  <div className="col-sm-6 ">
                    <input
                      className="inputsearchcounty"
                      placeholder="Search"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                </div>
                <div className="main_div_scroll_state">
                  {countyData.data ? (
                    countyData.data
                      .filter((post) => {
                        if (query === "") {
                          return post;
                        } else if (
                          post.name.toLowerCase().includes(query.toLowerCase())
                        ) {
                          return post;
                        }
                      })
                      .map((country, index) => {
                        return (
                          <>
                            <div key={index} className="row mx-5 ">
                              <div className="col-2 checkbox_style_desired_county">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="checkbox"
                                  name="checkbox"
                                  checked={selectedCheckboxes.includes(
                                    country?.id
                                  )}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, country?.id)
                                  }
                                />
                              </div>
                              <p className="col-10 countynamestyle">
                                {country.name}
                              </p>
                            </div>
                          </>
                        );
                      })
                  ) : (
                    <SpinnerLoader />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 checkboxbuttonforcoountysubmit "
              >
                Let’s Find the Desired City
              </button>
            </>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 third_div_main_county p-0">
            <img className="third_divdesignforcode_county" src={design} />
          </div>
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
export default DesiredCounty;
