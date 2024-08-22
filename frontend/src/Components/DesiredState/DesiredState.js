import React, { useEffect } from "react";
import designleftside from "./../../Assets/designleftside.PNG";
import "./../DesiredState/DesiredStateStyle.css";
import ppclogo from "./../../Assets/ppclogo.png";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";

function DesiredState() {
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  const navigate = useNavigate();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
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

  const handleCheckboxChange = (e, checkboxValue) => {
    if (e.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== checkboxValue)
      );
    }
  };

  localStorage.setItem("states", JSON.stringify(selectedCheckboxes));

  const projectStateSelectionAction = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    let payload = {
      email: getEmailData(),
      state_ids: selectedCheckboxes,
    };
    axios
      .post("/api/add-user-states", payload)
      .then((r) => {
        setIsModalOpen(false);
        setnotificationMessage(r.data.data.message);
        navigate("/county");
      })
      .catch((e) => {
        setIsModalOpen(false);
        if (e.response.data.errors != undefined) {
          setIsModalOpen(false);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  const [statedata, setStateData] = useState("");
  useEffect(() => {
    getStatedata();
  }, []);

  const getStatedata = () => {
    axios.get(`/api/get-states`).then((res) => {
      setStateData(res.data);
    });
  };

  const [query, setQuery] = useState("");

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
          <a>
            <img src={ppclogo} className="ppc_logo" alt="" />
          </a>
        </div>
        <div className="col p-0">
          <div className="progress ">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "90%" }}
              aria-valuenow="90"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <label className="numberperctage"> Step 5 of 7</label>
        </div>
      </div>
      <form onSubmit={(e) => projectStateSelectionAction(e)}>
        <div className="main_div_role row">
          <div className="col-sm-12 col-md-4 col-lg-4 maindesign">
            <img className="first_div_style" src={designleftside} alt="" />
          </div>
          <div className="mt-5 col-sm-12 col-md-4 col-lg-4">
            <p className="desiredstateheading">
              Please select the desired State
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
                    className="inputsearch"
                    placeholder="Search"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="main_div_scroll_state">
                {statedata.data ? (
                  statedata.data
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
                        <div className="col-2 checkbox_style_desired_state">
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

            <button type="submit" className="mt-5 checkboxbuttonforrolesubmit">
              Let’s Find the Desired Counties
            </button>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 p-0"></div>
        </div>
      </form>

      <>
        <div
          className={`modal fade bd-example-modal-sm ${
            isModalOpen ? "show" : ""
          } mt-5`}
          style={{ display: isModalOpen ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden={!isModalOpen}
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <SpinnerLoader />
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default DesiredState;
